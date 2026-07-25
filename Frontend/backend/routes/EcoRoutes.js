import express from "express";
import fs from "fs";
import csv from "csv-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const DATA_PATH = path.join(__dirname, "..", "product_table_with_eco_scores_with_status.csv");

// Utility: load csv and return array of objects
function loadDataset() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(DATA_PATH)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

// Helper: find product (case-insensitive match on product_name)
function findProduct(dataset, queryName) {
  const q = String(queryName || "").trim().toLowerCase();
  if (!q) return null;
  return dataset.find(row => (row.product_name || "").toLowerCase().includes(q));
}

// Nodemailer transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

/**
 * POST /api/lookup
 * Body: { product_name: "Ponds Men Bright..." }
 * Returns: product details with eco_score, ideal_eco_score, eco_status
 */
router.post("/lookup", async (req, res) => {
  try {
    const { product_name } = req.body;
    if (!product_name) return res.status(400).json({ error: "product_name required" });

    const dataset = await loadDataset();
    const product = findProduct(dataset, product_name);

    if (!product) {
      return res.status(404).json({ error: "Product not found in dataset" });
    }

    // Ensure numeric fields are numbers
    product.eco_score = Number(product.eco_score);
    product.ideal_eco_score = Number(product.ideal_eco_score);

    // If eco_status not present, compute quickly (tolerance 2)
    if (!product.eco_status) {
      const diff = product.eco_score - product.ideal_eco_score;
      product.eco_status = diff >= 2 ? "Very Good" : (diff <= -2 ? "Bad" : "Good");
    }

    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/send-alert", async (req, res) => {
  try {
    const prod = req.body.product;
    if (!prod) return res.status(400).json({ error: "product object required" });

    // Double-check status server-side
    const ecoScore = Number(prod.eco_score || 0);
    const ideal = Number(prod.ideal_eco_score || 0);
    const diff = ecoScore - ideal;
    const status = prod.eco_status || (diff >= 2 ? "Very Good" : (diff <= -2 ? "Bad" : "Good"));

    if (status !== "Bad") {
      return res.status(400).json({ error: "Product is not flagged as Bad. No alert sent." });
    }

    const senderEmail = process.env.SENDER_EMAIL;
    const senderPass = process.env.SENDER_PASSWORD;
    const targetEmail = process.env.GOV_EMAIL || senderEmail;

    if (!senderEmail || !senderPass) {
      console.warn("⚠️ Alert triggered, but SENDER_EMAIL or SENDER_PASSWORD environment variables are missing on Render.");
      return res.json({ 
        message: "Alert logged! (To receive live email alerts, set SENDER_EMAIL and SENDER_PASSWORD on Render)",
        simulated: true
      });
    }

    // Build HTML content (single-product)
    let tableHTML = "<table border='1' cellpadding='6' style='border-collapse:collapse'>";
    Object.keys(prod).forEach(key => {
      tableHTML += `<tr><th style="text-align:left;padding:6px;background:#f3f4f6">${key}</th><td style="padding:6px">${prod[key]}</td></tr>`;
    });
    tableHTML += "</table>";

    const mailOptions = {
      from: `"Eco Lens" <${senderEmail}>`,
      to: targetEmail,
      subject: `Eco Lens Alert — Product flagged: ${prod.product_name || "Non-Compliant Product"}`,
      html: `<p>Dear Government Official / Compliance Officer,</p>
             <p>The following product has been flagged on EcoLens for failing environmental compliance:</p>
             ${tableHTML}
             <p>Regards,<br/>Eco Lens Team</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: `Alert sent successfully to ${targetEmail}!` });
  } catch (err) {
    console.error("Failed to dispatch government alert email:", err);
    res.status(500).json({ error: `Email Error: ${err.message}` });
  }
});

export default router;
