"use client";

import { Star, Trophy, Sparkles, BookOpen, Wand2 } from "lucide-react";
import { CorrectionResponse } from "@/services/api";

interface ResultCardProps {
  result: CorrectionResponse;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-12 duration-700">
      <div className="flex flex-col items-center mb-8">
        <div className="p-10 bg-[#FFCC00] text-white rounded-[64px] shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-500">
          <Trophy size={80} className="relative z-10 drop-shadow-xl" fill="currentColor" />
          <div className="absolute top-0 right-0 p-4 opacity-50"><Star size={40} fill="currentColor" /></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mt-6 tracking-tight uppercase">Nice Job!</h2>
        <p className="text-slate-500 font-bold text-lg mt-1">&quot;Check out your improvements below!&quot;</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-10 bg-white border-8 border-indigo-50 rounded-[64px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen size={64} className="text-indigo-600" />
          </div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Your Sentence (Refined)</h3>
          <p className="text-3xl text-slate-900 font-black leading-tight">
            {result.corrected}
          </p>
        </div>

        <div className="p-10 bg-indigo-600 text-white rounded-[64px] shadow-2xl relative overflow-hidden group border-8 border-indigo-50/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wand2 size={64} className="text-white" />
          </div>
          <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-6">Expert Mode!</h3>
          <p className="text-3xl text-white font-black leading-tight">
            {result.improved}
          </p>
        </div>
      </div>

      <div className="p-10 bg-indigo-50 border-4 border-dashed border-indigo-100 rounded-[64px] relative group overflow-hidden">
        <div className="relative z-10 flex items-start space-x-8">
            <div className="p-6 bg-white rounded-[32px] shadow-xl text-indigo-600 rotate-[-5deg]">
                <Sparkles size={40} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 italic italic-bold underline decoration-indigo-200">The Wise Owl Explains</h3>
              <p className="text-slate-700 leading-relaxed text-2xl font-bold">
                  {result.explanation}
              </p>
            </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-30 group-hover:scale-110 transition-transform"></div>
      </div>

      <div className="flex justify-center pt-8">
        <button className="px-12 py-6 bg-indigo-600 text-white rounded-[32px] font-black text-2xl shadow-2xl shadow-indigo-200 hover:scale-110 active:scale-95 transition-all uppercase tracking-tight">
             Keep Learning! 🔥
        </button>
      </div>
    </div>
  );
}
