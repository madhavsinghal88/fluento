"use client";

import { useState } from "react";
import { Sparkles, Trophy, Star, ArrowLeft, Gamepad2, Lightbulb, MapPin, Globe } from "lucide-react";
import Link from "next/link";
import QuizGame from "@/components/QuizGame";
import WordGame from "@/components/WordGame";
import Image from "next/image";

export default function KidsPage() {
  const [activeGame, setActiveGame] = useState<"quiz-india" | "quiz-world" | "word" | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFEFE] flex flex-col items-center pt-32 pb-20 px-4 relative overflow-x-hidden">
      
      {/* Background patterns */}
      <div className="absolute top-40 right-20 text-yellow-400 rotate-12 opacity-10 animate-bounce"><Star size={120} fill="currentColor" /></div>
      <div className="absolute bottom-40 left-20 text-blue-400 -rotate-12 opacity-10 animate-pulse"><Trophy size={160} fill="currentColor" /></div>
      <div className="absolute top-1/2 left-1/4 text-indigo-50 opacity-5 -z-10"><Gamepad2 size={400} /></div>

      <div className="max-w-6xl w-full space-y-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 text-center md:text-left">
          <Link href="/" className="px-8 py-4 bg-white rounded-[24px] shadow-xl hover:bg-black hover:text-white transition-all font-black text-xl uppercase">
            Go Back
          </Link>
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-indigo-600 px-6 py-2 rounded-full text-white font-black uppercase text-xs tracking-widest shadow-xl">
                <Sparkles size={16} />
                <span>Choose Your Challenge! 🍭</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter">Fluento Arena</h1>
          </div>
        </div>

        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            {/* India Quiz */}
            <button
                onClick={() => setActiveGame("quiz-india")}
                className="group p-12 bg-white border-8 border-slate-50 rounded-[48px] shadow-2xl hover:scale-105 transition-all text-center space-y-6 relative overflow-hidden"
            >
                <div className="w-24 h-24 bg-orange-50 rounded-[32px] flex items-center justify-center text-orange-600 mx-auto group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <MapPin size={48} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 uppercase">India Quiz</h3>
                    <p className="text-lg text-slate-400 font-bold">States & Capitals!</p>
                </div>
                <div className="absolute -top-4 -right-4 p-4 bg-orange-500 text-white rounded-full"><Trophy size={24} /></div>
            </button>

            {/* World Quiz */}
            <button
                onClick={() => setActiveGame("quiz-world")}
                className="group p-12 bg-white border-8 border-slate-50 rounded-[48px] shadow-2xl hover:scale-105 transition-all text-center space-y-6 relative"
            >
                <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center text-blue-600 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Globe size={48} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 uppercase">World Quiz</h3>
                    <p className="text-lg text-slate-400 font-bold">Capitals of Nations!</p>
                </div>
                <div className="absolute -top-4 -right-4 p-4 bg-blue-500 text-white rounded-full"><Star size={24} fill="currentColor" /></div>
            </button>

            {/* Word Game */}
            <button
                onClick={() => setActiveGame("word")}
                className="group p-12 bg-indigo-600 text-white rounded-[48px] shadow-2xl hover:scale-105 transition-all text-center space-y-6 relative border-8 border-indigo-500/20"
            >
                <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center text-white mx-auto group-hover:bg-white group-hover:text-black transition-colors">
                    <Sparkles size={48} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-black uppercase">Word Builder</h3>
                    <p className="text-lg text-indigo-100 font-bold">Use Magic Words!</p>
                </div>
                <div className="absolute -top-4 -right-4 p-4 bg-black text-white rounded-full"><Lightbulb size={24} /></div>
            </button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-500">
            <div className="flex items-center justify-between">
                <button onClick={() => setActiveGame(null)} className="px-8 py-3 bg-slate-100 text-slate-500 font-black rounded-full uppercase text-sm">Choose another</button>
                <div className="flex items-center space-x-4">
                    <Image src="/mascot.png" alt="Owl" width={64} height={64} className="rounded-full shadow-lg" />
                    <span className="text-xl font-black text-slate-900 uppercase">The Wise Owl is Watching!</span>
                </div>
            </div>

            {activeGame === "quiz-india" && <QuizGame mode="india" />}
            {activeGame === "quiz-world" && <QuizGame mode="world" />}
            {activeGame === "word" && <WordGame />}
          </div>
        )}
      </div>
    </div>
  );
}
