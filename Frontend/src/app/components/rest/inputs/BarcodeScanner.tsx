'use client';

import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
}

export default function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const detectedRef = useRef(false); // Prevent multiple detections

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const initScanner = async () => {
      try {
        let selectedDeviceId: string | undefined;

        try {
          const devices = await BrowserMultiFormatReader.listVideoInputDevices();
          if (devices && devices.length > 0) {
            const backCamera = devices.find(device => 
              device.label.toLowerCase().includes('back') || 
              device.label.toLowerCase().includes('rear') ||
              device.label.toLowerCase().includes('environment')
            );
            selectedDeviceId = backCamera?.deviceId || devices[0]?.deviceId;
          }
        } catch (deviceErr) {
          console.warn("Could not enumerate camera devices, using default camera", deviceErr);
        }

        if (videoRef.current && isScanning) {
          console.log('Starting barcode scanner with device:', selectedDeviceId || 'default webcam');
          
          controlsRef.current = await codeReader.decodeFromVideoDevice(
            selectedDeviceId || undefined,
            videoRef.current,
            (result, error, controls) => {
              if (result && !detectedRef.current) {
                const scannedCode = result.getText();
                console.log('Barcode detected:', scannedCode);
                
                // Prevent multiple rapid detections
                detectedRef.current = true;
                setIsScanning(false);
                
                // Call the parent callback
                onDetected(scannedCode);
                
                // Stop the scanner
                setTimeout(() => {
                  controls.stop();
                }, 100);
              }
            }
          );
        }
      } catch (err) {
        console.error("Camera initialization failed:", err);
        setIsScanning(false);
      }
    };

    if (isScanning) {
      initScanner();
    }

    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop();
        controlsRef.current = null;
      }
    };
  }, [onDetected, isScanning]);

  // Reset detection flag when component unmounts or scanning stops
  useEffect(() => {
    if (!isScanning) {
      detectedRef.current = false;
    }
  }, [isScanning]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline // Important for mobile devices
      />
      
      {/* Scanning overlay with focus area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Scanning frame */}
          <div className="w-64 h-32 border-2 border-green-400 border-dashed rounded-lg bg-transparent">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
          </div>
          
          {/* Instructions */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-white bg-black/50 px-2 py-1 rounded">
              {isScanning ? 'Align barcode within frame' : 'Barcode detected!'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Scanning animation line */}
      {isScanning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-32 overflow-hidden">
            <div className="w-full h-0.5 bg-red-500 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}