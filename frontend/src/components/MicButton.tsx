"use client";

import { useState, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

interface MicButtonProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
}

export default function MicButton({ onTranscription, disabled }: MicButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscription(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
        recognitionRef.current.stop();
    }
  };

  return (
    <div className="relative">
      {isListening && (
        <div className="absolute -inset-4 bg-red-400 rounded-full blur-2xl animate-pulse opacity-40"></div>
      )}
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        className={`relative z-10 w-20 h-20 rounded-full transition-all flex items-center justify-center text-white ${
          isListening
            ? "bg-red-500 shadow-xl shadow-red-200 border-4 border-red-50"
            : "bg-indigo-600 shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 border-4 border-indigo-50"
        } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        title={isListening ? "Stop Speaking" : "Start Speaking"}
      >
        {isListening ? (
          <MicOff size={40} className="animate-bounce" />
        ) : (
          <Mic size={40} />
        )}
      </button>
      {!isListening && (
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-100 text-indigo-700 font-bold rounded-2xl text-xs whitespace-nowrap animate-bounce shadow-sm">
             Click me! 🎤
          </span>
      )}
    </div>
  );
}
