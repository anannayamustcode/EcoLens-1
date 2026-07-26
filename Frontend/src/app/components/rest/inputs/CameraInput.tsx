"use client";

import { useState, useRef, useEffect } from 'react';
import { Camera, Loader2, RefreshCw } from 'lucide-react';

interface CameraInputProps {
  onCapture: (imageUrl: string) => void;
}

export default function CameraInput({ onCapture }: CameraInputProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not supported in your browser');
      return;
    }

    setIsLoading(true);
    setError(null);
    stopCamera();

    try {
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
      } catch (firstErr) {
        console.warn("Target camera mode failed, trying default webcam", firstErr);
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = resolve;
        });
        videoRef.current.play();
      }
      setStream(mediaStream);
    } catch (err: any) {
      console.error('Camera error:', err);
      setError('Could not access camera. Please allow camera permissions in your browser settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCameraMode = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  const captureImage = () => {
    if (!videoRef.current || !stream) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/jpeg', 0.85);

      stopCamera();
      onCapture(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {error ? (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-xl text-center space-y-2">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={startCamera}
            className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
          >
            Retry Camera Access
          </button>
        </div>
      ) : (
        <div className="w-full h-64 sm:h-72 bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 relative shadow-inner flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-2 text-white">
              <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
              <p className="text-xs text-gray-300">Opening camera...</p>
            </div>
          ) : stream ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={toggleCameraMode}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all border border-white/20"
                title={`Switch to ${facingMode === 'environment' ? 'Front' : 'Back'} Camera`}
              >
                <RefreshCw size={18} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
              <Camera className="w-12 h-12" />
              <p className="text-xs">Camera is ready</p>
            </div>
          )}
        </div>
      )}

      {stream && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={captureImage}
            className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 shadow-md transition-all flex items-center gap-2 text-sm"
          >
            <Camera size={18} />
            <span>Take Photo</span>
          </button>
          <button
            type="button"
            onClick={toggleCameraMode}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm flex items-center gap-1.5"
          >
            <RefreshCw size={16} />
            <span>Flip ({facingMode === 'environment' ? 'Back' : 'Front'})</span>
          </button>
        </div>
      )}
    </div>
  );
}