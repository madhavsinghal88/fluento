"use client";

import OwlRace from "@/components/OwlRace";
import { ArrowLeft, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";

export default function OwlRacePage() {
    return (
        <div className="min-h-screen bg-[#FDFEFE] flex flex-col items-center pt-32 pb-20 px-4 relative overflow-x-hidden">
            
            {/* Background patterns */}
            <div className="absolute top-40 right-20 text-yellow-400 rotate-12 opacity-10 animate-bounce"><Star size={120} fill="currentColor" /></div>
            <div className="absolute bottom-40 left-20 text-blue-400 -rotate-12 opacity-10 animate-pulse"><Trophy size={160} fill="currentColor" /></div>

            <div className="max-w-6xl w-full space-y-12 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
                    <Link href="/kids" className="px-10 py-5 bg-white border-4 border-slate-100 rounded-[32px] shadow-xl hover:bg-black hover:text-white transition-all font-black text-xl uppercase flex items-center gap-3">
                        <ArrowLeft size={24} /> Arena Map
                    </Link>
                    <div className="text-center md:text-right space-y-2">
                        <div className="inline-flex items-center space-x-2 bg-indigo-600 px-6 py-2 rounded-full text-white font-black uppercase text-xs tracking-widest shadow-xl">
                            <Sparkles size={16} />
                            <span>Mascot Sprint 🏃‍♂️</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter">The Owl Race</h1>
                    </div>
                </div>

                {/* Main Race Component */}
                <div className="animate-in fade-in zoom-in duration-700">
                    <OwlRace />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-10 rounded-[48px] border-4 border-slate-100 shadow-xl space-y-4">
                        <div className="w-16 h-16 bg-yellow-100 rounded-[24px] flex items-center justify-center text-yellow-600">
                            <Trophy size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase">Weekly Rank</h3>
                        <p className="text-slate-400 font-bold">Top 1% of all student racers!</p>
                    </div>
                    <div className="bg-white p-10 rounded-[48px] border-4 border-slate-100 shadow-xl space-y-4">
                        <div className="w-16 h-16 bg-indigo-100 rounded-[24px] flex items-center justify-center text-indigo-600">
                            <Star size={32} fill="currentColor" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase">XP Rewards</h3>
                        <p className="text-slate-400 font-bold">Earn 10 XP for every 1000m dash!</p>
                    </div>
                    <div className="bg-white p-10 rounded-[48px] border-4 border-slate-100 shadow-xl space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-[24px] flex items-center justify-center text-green-600">
                            <Rocket size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase">New Mods</h3>
                        <p className="text-slate-400 font-bold">Collect gold to unlock fire trails!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Star({ size, fill }: { size: number, fill: string }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>;
}

function Rocket({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>;
}
