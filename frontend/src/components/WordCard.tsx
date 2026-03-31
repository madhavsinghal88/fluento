"use client";

import { Star, Hash, BookOpen } from "lucide-react";
import { WordDTO } from "@/services/api";

interface WordCardProps {
  word: WordDTO;
}

export default function WordCard({ word }: WordCardProps) {
  return (
    <div className="p-8 bg-white border-4 border-slate-50 rounded-[40px] shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-center relative overflow-hidden group">
      {/* Decorative star for kids */}
      <div className="absolute -top-4 -left-4 p-4 bg-[#FFCC00] rounded-full text-white rotate-[-15deg] shadow-lg group-hover:rotate-[15deg] transition-transform">
        <Star size={24} fill="currentColor" />
      </div>

      <div className="flex flex-col items-center space-y-4 pt-4">
        <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-blue-600 mb-2">
          <BookOpen size={32} />
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{word.word}</h3>
        
        <p className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-2xl text-xs uppercase tracking-widest">
            Level 1 Word
        </p>
        
        <div className="space-y-2 mt-4">
            <p className="text-slate-500 font-medium leading-relaxed italic">
                &quot;{word.meaning}&quot;
            </p>
            <p className="text-indigo-600 font-bold text-sm bg-indigo-50 p-4 rounded-3xl">
                {word.example}
            </p>
        </div>
      </div>

      {/* Rarity/Progress bar dummy for visual flair */}
      <div className="mt-6 h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full w-[80%] bg-[#FFCC00] rounded-full"></div>
      </div>
    </div>
  );
}
