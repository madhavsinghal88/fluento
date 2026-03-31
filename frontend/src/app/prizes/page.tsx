"use client";

import { useEffect, useState } from "react";
import { Gift, Zap, Sparkles, Star, Trophy, ChevronRight, Car, Plane, Candy } from "lucide-react";
import { Child } from "@/services/api";

export default function Prizes() {
    const [child, setChild] = useState<Child | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("fluento_child");
        if (saved) setChild(JSON.parse(saved));
    }, []);

    const userXp = child?.totalXp || 0;

    const PRIZES = [
        {
            id: 1,
            name: "Super RC Helicopter",
            xp: 5000,
            icon: <Plane size={120} />,
            color: "bg-indigo-600",
            lightColor: "bg-indigo-50",
            textColor: "text-indigo-600",
            description: "High-flying action! Remote control mastery with LED lights and 360 spins. Perfect for master flyers!",
            points: ["Dual-control tech", "Auto-hover mastery", "Impact-proof wings"]
        },
        {
            id: 2,
            name: "Nitro RC Race Car",
            xp: 3000,
            icon: <Car size={120} />,
            color: "bg-[#FF5722]",
            lightColor: "bg-orange-50",
            textColor: "text-[#FF5722]",
            description: "Extreme speed! Off-road tires, rechargeable battery, and pro steering for the ultimate race hero.",
            points: ["Pro steering tech", "Off-road power", "Drift mode active"]
        },
        {
            id: 3,
            name: "KinderJoy Feast",
            xp: 1000,
            icon: <Candy size={120} />,
            color: "bg-[#4CAF50]",
            lightColor: "bg-green-50",
            textColor: "text-[#4CAF50]",
            description: "Double the fun! Delicious treat plus a secret surprise toy for your collection.",
            points: ["Creamy delight", "Mystery toy inside", "Collector's edition"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6">
            <div className="max-w-6xl mx-auto space-y-20">
                
                {/* Header section */}
                <div className="text-center space-y-8">
                    <div className="inline-flex items-center space-x-3 bg-[#FFCC00] px-10 py-4 rounded-full text-black font-black uppercase text-xl shadow-2xl rotate-[-2deg]">
                        <Gift size={32} />
                        <span>The Reward Arena 🎁</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                        Claim Your <br />
                        <span className="text-indigo-600 underline decoration-[#FFCC00] decoration-[12px] underline-offset-[10px]">Victory!</span>
                    </h1>
                    <p className="text-2xl text-slate-400 font-bold max-w-2xl mx-auto italic uppercase tracking-[0.2em] pt-6">
                        Complete quests, earn XP, and unlock real-world gadgets! ⚡️
                    </p>
                </div>

                {/* Rank Analytics for User */}
                <div className="bg-white p-12 rounded-[80px] shadow-2xl border-8 border-slate-50 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 opacity-5"><Star size={200} /></div>
                    <div className="space-y-6 relative z-10 text-center md:text-left">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Hero Performance</p>
                        <h2 className="text-6xl font-black text-slate-900 uppercase italic whitespace-nowrap">{child?.name || "Guest Hero"}</h2>
                        <div className="flex space-x-6 items-center justify-center md:justify-start">
                             <div className="bg-indigo-600 px-8 py-3 rounded-full text-white font-black text-xl shadow-lg">Level {child?.currentLevel || 1}</div>
                             <div className="text-4xl font-black text-indigo-600">{userXp} TOTAL XP</div>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">XP Progress to Next Perk</p>
                            <p className="text-2xl font-black text-indigo-600">
                                {userXp < 1000 ? `${1000 - userXp} to KinderJoy` : 
                                 userXp < 3000 ? `${3000 - userXp} to RC Car` :
                                 userXp < 5000 ? `${5000 - userXp} to RC Helicopter` : "Maxed Out!"}
                            </p>
                        </div>
                        <div className="h-10 bg-slate-100 rounded-[32px] overflow-hidden p-2 shadow-inner border-2 border-slate-50 relative">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-1000 shadow-xl"
                                style={{ width: `${Math.min((userXp / 5000) * 100, 100)}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-indigo-900 opacity-30 uppercase tracking-[0.5em]">
                                Leveling Up
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prize Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {PRIZES.map((p) => {
                        const isUnlocked = userXp >= p.xp;
                        const progress = Math.min((userXp / p.xp) * 100, 100);

                        return (
                            <div key={p.id} className="bg-white rounded-[80px] border-8 border-slate-50 shadow-2xl relative group overflow-hidden flex flex-col h-full hover:scale-[1.02] transition-transform">
                                {/* Header Color Strip */}
                                <div className={`h-6 ${p.color} w-full`}></div>
                                
                                <div className="p-12 flex flex-col flex-1 items-center space-y-10">
                                    {/* Icon Box */}
                                    <div className={`w-48 h-48 ${p.lightColor} ${p.textColor} rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform relative`}>
                                        {!isUnlocked && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[2px] rounded-full z-20">
                                                <div className="bg-white p-4 rounded-full shadow-2xl text-slate-800"><Zap size={24} /></div>
                                            </div>
                                        )}
                                        {p.icon}
                                    </div>

                                    <div className="text-center space-y-4">
                                        <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">{p.name}</h3>
                                        <div className={`inline-flex items-center space-x-2 ${isUnlocked ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'} px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest`}>
                                            {isUnlocked ? <Trophy size={16} /> : <Zap size={16} />}
                                            <span>{isUnlocked ? "Unlocked & Ready!" : `${p.xp} XP Required`}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 font-bold text-lg leading-relaxed text-center italic">&quot;{p.description}&quot;</p>

                                    <div className="w-full space-y-6 flex-1">
                                        <div className="flex flex-col space-y-3">
                                            {p.points.map(pt => (
                                                <div key={pt} className="flex items-center space-x-3 text-slate-900 font-black uppercase text-xs">
                                                    <div className={`h-2 w-2 rounded-full ${p.color}`}></div>
                                                    <span>{pt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full pt-8">
                                        {isUnlocked ? (
                                            <button className={`${p.color} w-full py-8 text-white font-black text-2xl rounded-[40px] shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center uppercase tracking-widest`}>
                                                Redeem Victory <ChevronRight className="ml-2" />
                                            </button>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                                                    <span>Progress to Unlock</span>
                                                    <span>{Math.floor(progress)}%</span>
                                                </div>
                                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${p.color} rounded-full`} style={{ width: `${progress}%` }}></div>
                                                </div>
                                                <button disabled className="w-full py-8 bg-slate-100 text-slate-300 font-black text-2xl rounded-[40px] uppercase tracking-widest cursor-not-allowed">
                                                    Quest to Unlock
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Motivation */}
                <div className="bg-indigo-600 p-20 rounded-[80px] shadow-2xl relative overflow-hidden text-center space-y-8">
                    <div className="absolute top-0 left-0 p-10 opacity-10 rotate-12"><Sparkles size={200} /></div>
                    <div className="absolute bottom-0 right-0 p-10 opacity-10 -rotate-12"><Trophy size={140} /></div>
                    
                    <h3 className="text-6xl font-black text-white uppercase italic tracking-tighter relative z-10">Want Even More?</h3>
                    <p className="text-xl text-indigo-100 font-bold max-w-xl mx-auto uppercase tracking-widest relative z-10">The top 3 participants on the global leaderboard are eligible for seasonal secret rewards including iPads, Lego Sets, and Gold Medals!</p>
                    
                    <div className="pt-6 relative z-10">
                        <button onClick={() => window.location.href='/rankings'} className="bg-white text-indigo-600 px-12 py-6 rounded-[32px] font-black text-xl hover:scale-110 active:scale-95 transition-all shadow-2xl uppercase inline-flex items-center">
                            Check Global Rankings <ArrowUpRight size={32} className="ml-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowUpRight({ size, className }: { size: number, className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    );
}
