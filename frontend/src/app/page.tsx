"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Star, Trophy, Users, Building2, Monitor } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      
      {/* Playful background elements */}
      <div className="absolute top-20 left-20 text-yellow-400 rotate-12 opacity-50 animate-bounce"><Star size={64} fill="currentColor" /></div>
      <div className="absolute bottom-20 right-20 text-blue-400 -rotate-12 opacity-50 animate-pulse"><Trophy size={80} fill="currentColor" /></div>
      <div className="absolute top-1/2 left-1/4 text-indigo-200 opacity-20 -z-10"><Users size={200} /></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-20 md:space-y-0 md:space-x-16">
        
        {/* Left Side: Mascot and Fun Graphic */}
        <div className="flex-1 flex flex-col items-center relative group min-w-[300px]">
          <div className="absolute -inset-10 bg-indigo-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <Image 
            src="/mascot.png" 
            alt="English Learning Mascot" 
            width={400} 
            height={400} 
            className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 pointer-events-none"
            onError={(e) => {
                (e.target as any).src = "https://cdn-icons-png.flaticon.com/512/3069/3069172.png";
            }}
          />
          <div className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 bg-white px-8 py-4 rounded-[32px] shadow-2xl border-4 border-slate-50 -rotate-6 z-20 max-w-[200px]">
             <p className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                &quot;Ready to play?!&quot;
             </p>
          </div>
        </div>

        {/* Right Side: Text and CTA */}
        <div className="flex-1 space-y-12 text-center md:text-left">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-[#FFCC00] text-black rounded-full font-black text-sm uppercase tracking-widest shadow-xl rotate-[-2deg]">
            <Sparkles size={24} />
            <span>Learning is Fun! 🍭</span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-tight tracking-tighter">
            Fluento <br />
            <span className="text-indigo-600 underline decoration-[#FFCC00] decoration-[12px] underline-offset-[10px]">Level Up</span>
          </h1>

          <p className="text-2xl text-slate-500 font-bold max-w-[500px] mx-auto md:mx-0 leading-relaxed">
            Win stars, learn magic words, and get super feedback on your sentences!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            <Link
              href="/kids"
              className="px-8 py-6 bg-black text-white rounded-[32px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group uppercase tracking-tight"
            >
              Kids Hub! 🍭
              <Sparkles className="ml-3 animate-pulse group-hover:scale-125 transition-transform" size={24} />
            </Link>
            <Link
              href="/practice"
              className="px-8 py-6 bg-indigo-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-indigo-100 hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center group uppercase tracking-tight"
            >
              Practice! 🔥
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </Link>
            <Link
              href="/games/logo"
              className="px-8 py-6 bg-[#FF5722] text-white rounded-[32px] font-black text-xl shadow-2xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group uppercase tracking-tight"
            >
              Logo Quiz! 🏆
              <Building2 className="ml-3 group-hover:rotate-12 transition-transform" size={24} />
            </Link>
            <Link
              href="/classroom/teacher"
              className="px-8 py-6 bg-[#4CAF50] text-white rounded-[32px] font-black text-xl shadow-2xl shadow-green-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group uppercase tracking-tight"
            >
              Teacher Mode 🍎
              <Monitor className="ml-3 group-hover:rotate-12 transition-transform" size={24} />
            </Link>
            <Link
              href="/classroom/student"
              className="px-8 py-6 bg-[#2196F3] text-white rounded-[32px] font-black text-xl shadow-2xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group uppercase tracking-tight"
            >
              Student Lobby 🎒
              <Users className="ml-3 group-hover:scale-125 transition-transform" size={24} />
            </Link>
            <div className="px-8 py-6 bg-white text-slate-600 rounded-[32px] font-black text-xl border-4 border-slate-50 shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center cursor-default uppercase">
              Join free
            </div>
          </div>

          <div className="flex items-center space-x-10 pt-16 justify-center md:justify-start">
            <div className="flex -space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg hover:scale-110 transition-transform">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="text-slate-400 font-black text-xl uppercase tracking-tighter">
                3M+ Kids Playing! 🚀
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
