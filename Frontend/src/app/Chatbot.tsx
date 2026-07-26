"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, Mic, MicOff, Volume2, VolumeX, Leaf, Sparkles, Bot, User as UserIcon } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  time?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How is EcoScore calculated?",
    "Plastic recycling codes explained",
    "How to compare two products?",
    "Harmful ingredients to avoid",
    "Reduce my carbon footprint"
  ];

  const knowledgeBase: Record<string, string> = {
    "how is ecoscore calculated": "🌱 **EcoScore Calculation Method**:\n\nEcoLens calculates a product's EcoScore (0-100) using 4 core metrics:\n\n1. **Lifecycle Assessment (LCA)** (35%): Raw material extraction, manufacturing emissions, and supply chain logistics.\n2. **Packaging Recyclability** (25%): Polymer type (PET, HDPE vs. Multi-layer plastics) & municipal recycling rate.\n3. **Ingredient Safety & Toxicity** (20%): Aquatic toxicity, microplastics, synthetic preservatives & palm oil sourcing.\n4. **Geographic Carbon Intensity** (20%): Sourcing distance from manufacturing origin to retail.\n\n*Scores above 75 are rated Grade A (Highly Sustainable).*",

    "plastic recycling codes": "♻️ **Plastic Resin Identification Codes (1-7)**:\n\n• **#1 PETE / PET**: Water bottles — **Highly Recyclable**\n• **#2 HDPE**: Milk jugs, shampoo bottles — **Highly Recyclable**\n• **#3 PVC**: Piping & vinyl — **Rarely Recyclable / Toxic**\n• **#4 LDPE**: Shopping bags, squeeze bottles — **Moderate Recyclability**\n• **#5 PP**: Yogurt tubs, bottle caps — **Recyclable**\n• **#6 PS**: Styrofoam, disposable cutlery — **Non-Recyclable**\n• **#7 OTHER / Multi-Layer**: Sachets & snack pouches — **Landfill bound**",

    "how to compare two products": "⚖️ **Product Comparison on EcoLens**:\n\n1. Click **Compare** in the navigation bar.\n2. Upload front & back images or enter URLs for **Product 1** and **Product 2**.\n3. Click **Compare** to generate a side-by-side analysis.\n4. EcoLens will highlight the winner based on carbon footprint, packaging grade, and eco-score!",

    "harmful ingredients to avoid": "⚠️ **Ingredients to Avoid for Eco & Health Safety**:\n\n• **Microplastics / Polyethylene**: Harms marine ecosystems & marine life.\n• **Uncertified Palm Oil**: Drives tropical deforestation & habitat destruction.\n• **Phthalates & Parabens**: Endocrine disruptors and aquatic toxins.\n• **Sodium Lauryl Sulfate (SLS/SLES)**: High aquatic toxicity during disposal.\n• **Synthetic Fragrances**: Volatile organic compounds (VOCs) that degrade air quality.",

    "reduce my carbon footprint": "🌍 **Top Actionable Tips to Reduce Your Footprint**:\n\n• **Switch to Refillables**: Choose bar soaps, shampoo concentrates, or glass containers.\n• **Scan Before Purchasing**: Use EcoLens barcode scanner to check products before buying.\n• **Buy Local**: Reduces transport emissions by up to 40%.\n• **Recycle Clean**: Rinse bottles before binning — dirty containers end up in landfills!",

    "carbon footprint": "🌱 **Understanding Carbon Footprint**:\n\nCarbon footprint measures total greenhouse gases (CO₂e) emitted throughout a product's lifecycle:\n\n• **Raw Materials**: ~40% of emissions\n• **Manufacturing & Processing**: ~30%\n• **Transportation & Distribution**: ~20%\n• **Consumer Usage & Disposal**: ~10%\n\nScanning a product on EcoLens gives you its exact kg CO₂e impact!",

    "government alert": "🚨 **Government Environmental Alert Feature**:\n\nIf you scan or lookup a product rated **Bad / Non-Compliant**, EcoLens enables a 1-click **Send Alert to Government** button. This sends an official report to environmental compliance authorities regarding toxic packaging or mislabeled claims."
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const speechObj = new SpeechRecognition();
      speechObj.continuous = false;
      speechObj.interimResults = false;
      speechObj.lang = 'en-US';

      speechObj.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      speechObj.onerror = () => setIsRecording(false);
      speechObj.onend = () => setIsRecording(false);

      setRecognition(speechObj);
    }
  }, []);

  const startRecording = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (recognition && !isRecording) {
      setIsRecording(true);
      try {
        recognition.start();
      } catch {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const speak = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const cleanText = text.replace(/[*#•]/g, '').replace(/[^\w\s.,!?-]/g, ' ').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural')));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Helper to format bold markdown text smoothly without raw **
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-green-950">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const generateSmartResponse = (query: string): string => {
    const normalized = query.toLowerCase().trim();

    // 1. Check Greetings (hi, hello, hey, heyy, heyyy, yo, sup, etc.)
    const greetingsRegex = /^(h+i+|h+e+l+o+|h+e+y+|y+o+|s+u+p+|h+o+w+d+y|good\s*morning|good\s*afternoon|good\s*evening|greetings|hola|namaste)$/i;
    if (greetingsRegex.test(normalized) || /^h[eiys]+/i.test(normalized)) {
      return "Hey there! 👋 Welcome to **EcoLens**. I'm your AI Sustainability Assistant. How can I help you today?\n\nYou can ask me about **EcoScores**, **plastic recycling codes**, **product comparisons**, or **eco-friendly tips**!";
    }

    // 2. Check Farewells (bye, byee, goodbye, cya, see ya, etc.)
    const farewellsRegex = /^(b+y+e+|g+o+o+d+b+y+e+|c+y+a+|s+e+e+\s*y+a+|s+e+e+\s*y+o+u+|g+o+o+d+n+i+g+h+t|night|take\s*care|ttyl)$/i;
    if (farewellsRegex.test(normalized)) {
      return "Goodbye! 🌱 Keep making conscious, sustainable choices for our planet. See you next time!";
    }

    // 3. Check Thanks / Gratitude
    const thanksRegex = /^(thanks+|thank\s*you+|thx|ty|awesome|great|cool|perfect|amazing)$/i;
    if (thanksRegex.test(normalized)) {
      return "You're very welcome! 💚 I'm always here to help you make greener, more sustainable decisions!";
    }

    // 4. Check Bot Identity / Help
    const identityRegex = /(who\s*are\s*you|what\s*is\s*your\s*name|what\s*can\s*you\s*do|help|what\s*are\s*you)/i;
    if (identityRegex.test(normalized)) {
      return "I am **EcoAssistant** 🤖🌱, your AI sustainability companion on EcoLens!\n\nI can help you:\n• Decode **plastic recycling codes** (1-7)\n• Calculate product **carbon footprints**\n• Compare two products side-by-side\n• Spot **harmful ingredients** to avoid";
    }

    // 5. Direct Knowledge Base matches
    for (const key in knowledgeBase) {
      if (normalized.includes(key)) {
        return knowledgeBase[key];
      }
    }

    // 6. Topic Keyword matching
    if (normalized.includes("recycle") || normalized.includes("waste") || normalized.includes("trash")) {
      return knowledgeBase["plastic recycling codes"];
    }
    if (normalized.includes("ingredient") || normalized.includes("toxic") || normalized.includes("paraben") || normalized.includes("chemical")) {
      return knowledgeBase["harmful ingredients to avoid"];
    }
    if (normalized.includes("score") || normalized.includes("grade") || normalized.includes("lca") || normalized.includes("calculate")) {
      return knowledgeBase["how is ecoscore calculated"];
    }
    if (normalized.includes("compare") || normalized.includes("versus") || normalized.includes("better")) {
      return knowledgeBase["how to compare two products"];
    }
    if (normalized.includes("alert") || normalized.includes("report") || normalized.includes("government")) {
      return knowledgeBase["government alert"];
    }
    if (normalized.includes("carbon") || normalized.includes("emission") || normalized.includes("co2")) {
      return knowledgeBase["carbon footprint"];
    }

    // 7. General Friendly Eco Response
    return `🌿 **EcoLens Assistant**:
\nI'd love to help you with that! 

To analyze any product's sustainability footprint:
• Use the **Upload**, **URL**, or **Barcode** scanner on the home page.
• Visit **Compare** to compare two products side-by-side.
• Check out our **EcoScore** metrics for carbon & ingredient breakdowns.

*Feel free to ask me about plastic codes, carbon emissions, or harmful ingredients!*`;
  };

  const processUserQuery = async (queryText: string) => {
    const userMsg: Message = { text: queryText, isUser: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Try fetching from API if backend is connected
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://ecolens-backend-o8xg.onrender.com";
      const response = await fetch(`${backendUrl}/api/get-eco-score-proxy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: queryText, brand: "Search", category: "General" }),
      }).catch(() => null);

      let responseText = "";
      if (response && response.ok) {
        const data = await response.json().catch(() => null);
        if (data && data.lca_results) {
          responseText = `🌱 **Product Sustainability Analysis for "${queryText}"**:\n\n• **EcoScore**: ${data.lca_results.eco_score}/100\n• **Carbon Footprint**: ${data.lca_results.total_emissions_kg_co2e} kg CO₂e\n• **Water Usage**: ${data.lca_results.water_usage_liters || 10} Liters\n• **Recyclability**: ${data.recyclability_analysis?.overall_recyclable ? "Recyclable ♻️" : "Non-Recyclable ⚠️"}`;
        }
      }

      if (!responseText) {
        responseText = generateSmartResponse(queryText);
      }

      const botMsg: Message = { text: responseText, isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, botMsg]);
      if (speechEnabled) speak(responseText);
    } catch {
      const fallbackText = generateSmartResponse(queryText);
      setMessages(prev => [...prev, { text: fallbackText, isUser: false }]);
      if (speechEnabled) speak(fallbackText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isRecording || isLoading) return;
    processUserQuery(input.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none ${
          isOpen ? 'bg-green-700' : 'bg-gradient-to-tr from-green-500 via-emerald-600 to-green-700 hover:from-green-600 hover:to-emerald-700'
        }`}
        aria-label="Toggle EcoAssistant"
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping pointer-events-none"></div>
        )}
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <>
            <Leaf className="w-7 h-7 text-white transform group-hover:rotate-12 transition-transform duration-300" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-green-200 animate-pulse pointer-events-none" />
          </>
        )}
      </button>

      {/* Chat Window - Responsive for Mobile & Desktop */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 sm:inset-auto sm:bottom-2 sm:right-0 w-[calc(100vw-1.5rem)] sm:w-[380px] max-w-[420px] h-[78vh] sm:h-[530px] max-h-[600px] bg-gradient-to-br from-green-50/95 via-white/95 to-emerald-50/95 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col border-2 border-green-300/60 overflow-hidden z-50">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white p-3.5 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide flex items-center gap-1.5">
                  EcoAssistant
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-green-100 font-medium">AI Sustainability Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSpeechEnabled(!speechEnabled);
                  if (isSpeaking) window.speechSynthesis.cancel();
                }}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                title={speechEnabled ? "Mute Voice" : "Enable Voice"}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Questions Toolbar */}
          <div className="px-3 py-2 bg-green-100/60 border-b border-green-200/50 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => processUserQuery(q)}
                className="text-[11px] bg-white hover:bg-green-600 hover:text-white text-green-800 font-medium px-2.5 py-1 rounded-full border border-green-300/60 shadow-sm transition-all flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5">
            {messages.length === 0 ? (
              <div className="text-center py-8 px-2">
                <div className="w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-200">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-green-900 text-base mb-1">Hi! I'm EcoAssistant 🌿</h4>
                <p className="text-xs text-gray-600 max-w-[260px] mx-auto leading-relaxed">
                  Ask me about product EcoScores, carbon footprints, plastic recycling codes, or eco-friendly alternatives!
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                    msg.isUser ? 'bg-green-600 text-white' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {msg.isUser ? <UserIcon size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.isUser
                        ? 'bg-green-600 text-white rounded-tr-none'
                        : 'bg-white border border-green-200/80 text-gray-800 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.isUser ? msg.text : renderFormattedText(msg.text)}
                    {msg.time && (
                      <div className={`text-[9px] mt-1 text-right ${msg.isUser ? 'text-green-100' : 'text-gray-400'}`}>
                        {msg.time}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-green-700 bg-white/80 p-2.5 rounded-2xl w-max border border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
                Thinking eco-friendly answers...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-green-200/60">
            <div className="flex items-center bg-gray-50 rounded-2xl border border-green-300/60 focus-within:border-green-600 focus-within:bg-white px-2 py-1 transition-all">
              <input
                type="text"
                placeholder={isRecording ? "🎤 Listening..." : "Type your eco question..."}
                className="flex-1 px-2 py-1.5 text-xs text-gray-800 bg-transparent focus:outline-none placeholder-gray-400"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isRecording || isLoading}
              />

              {recognition && (
                <button
                  type="button"
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  className={`p-1.5 rounded-full text-xs transition-colors mr-1 ${
                    isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-green-600'
                  }`}
                  title={isRecording ? "Release to stop" : "Hold to talk"}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              )}

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isRecording || isLoading}
                className="p-1.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-40 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Chatbot;
