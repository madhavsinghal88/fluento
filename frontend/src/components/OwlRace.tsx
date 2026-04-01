"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, Trophy, Star, UserCircle, Rocket, Flame, Zap, ChevronRight } from "lucide-react";
import { fetchLeaderboard, Child } from "@/services/api";

export default function OwlRace() {
    const [xp, setXp] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [leaderboard, setLeaderboard] = useState<Child[]>([]);
    const [child, setChild] = useState<Child | null>(null);
    const [isJumping, setIsJumping] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [isAccelerating, setIsAccelerating] = useState(false);
    
    // Parallax background items
    const [floatingItems, setFloatingItems] = useState<{ id: number, type: string, x: number, y: number, z: number, speed: number }[]>([]);

    useEffect(() => {
        const savedChild = localStorage.getItem("fluento_child");
        if (savedChild) setChild(JSON.parse(savedChild));

        // Initial XP from child
        if (savedChild) {
            const data = JSON.parse(savedChild);
            setXp(data.totalXp || 0);
        }

        // Generate parallax items
        const types = ["book", "pencil", "star", "atom"];
        const items = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            type: types[i % types.length],
            x: Math.random() * 100,
            y: Math.random() * 80 + 10,
            z: Math.random() * 3 + 1,
            speed: Math.random() * 0.2 + 0.1
        }));
        setFloatingItems(items);

        // Fetch leaderboard
        fetchLeaderboard().then(setLeaderboard).catch(console.error);
    }, []);

    const triggerBoost = () => {
        setIsAccelerating(true);
        setSpeed(prev => Math.min(prev + 0.5, 3));
        setTimeout(() => {
            setIsAccelerating(false);
            setSpeed(prev => Math.max(prev - 0.5, 1));
        }, 3000);
    };

    const handleJump = () => {
        if (isJumping) return;
        setIsJumping(true);
        
        // Randomly flip
        if (Math.random() > 0.4) {
            setTimeout(() => setIsFlipping(true), 100);
            setTimeout(() => setIsFlipping(false), 900);
        }

        setTimeout(() => setIsJumping(false), 1000);
    };

    return (
        <div className="relative w-full h-[500px] md:h-[650px] bg-[#0A0B1E] rounded-[64px] border-8 border-indigo-500/20 shadow-2xl overflow-hidden group">
            
            {/* 1. Starfield / Galaxy Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B1E] via-[#1A1B4B] to-[#3B1B7B] z-0"></div>
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {/* 2. Parallax Layers (Dust & Small Stars) */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
                
                {/* 3. Floating Parallax Items */}
                {floatingItems.map((item) => (
                    <div
                        key={item.id}
                        className="absolute transition-transform duration-[10s] linear"
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            transform: `scale(${1 / item.z})`,
                            opacity: item.z > 2 ? 0.3 : 0.7,
                            animation: `float ${10 / item.speed}s linear infinite`,
                            filter: item.z > 2 ? 'blur(2px)' : 'none'
                        }}
                    >
                        {item.type === "book" && <div className="text-4xl filter drop-shadow-lg">📘</div>}
                        {item.type === "pencil" && <div className="text-4xl filter drop-shadow-lg">✏️</div>}
                        {item.type === "star" && <div className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"><Star size={24} fill="currentColor" /></div>}
                        {item.type === "atom" && <div className="text-4xl filter drop-shadow-lg rotate-12">⚛️</div>}
                    </div>
                ))}
            </div>

            {/* 4. The Anti-Gravity Track */}
            <div className="absolute inset-0 z-20 pointer-events-none perspective-[1000px]">
                <div 
                    className="absolute bottom-[-100px] left-1/2 -translateX-1/2 w-[200%] h-[400px] bg-[linear-gradient(90deg,transparent_49%,rgba(99,102,241,0.2)_50%,transparent_51%),linear-gradient(0deg,transparent_49%,rgba(99,102,241,0.2)_50%,transparent_51%)] bg-[length:100px_100px]"
                    style={{
                      transform: "rotateX(75deg) translateX(-25%)",
                      animation: "moveTrack 1.5s linear infinite",
                      boxShadow: "0 -50px 100px rgba(99,102,241,0.2) inset"
                    }}
                >
                    {/* Glowing Edges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/30 to-transparent"></div>
                </div>
            </div>

            {/* 5. The Owl Mascot Container */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center group/owl">
                
                {/* 5.1 Speed Lines HUD - Firing only on Boost */}
                {isAccelerating && (
                    <div className="absolute -inset-[300px] flex items-center justify-center pointer-events-none">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div 
                                key={i} 
                                className="absolute w-[800px] h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
                                style={{ 
                                    transform: `translateY(${(i-3.5)*80}px) rotate(${Math.random()*10 - 5}deg)`,
                                    animation: `speedLine 0.15s linear infinite`,
                                    animationDelay: `${i * 0.05}s`
                                }}
                            ></div>
                        ))}
                    </div>
                )}

                {/* 5.2 Trail Particles */}
                <div className="absolute bottom-10 -left-10 w-40 h-20 pointer-events-none">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div 
                            key={i} 
                            className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-[1px]"
                            style={{ 
                                animation: `particle 0.8s linear infinite`,
                                animationDelay: `${i * 0.1}s`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                        ></div>
                    ))}
                </div>

                {/* 5.3 The Mascot Image */}
                <div 
                    className={`relative transition-all duration-[800ms]
                        ${isJumping ? '-translate-y-64 scale-110' : 'translate-y-0 scale-100'}
                        ${isFlipping ? 'rotate-[360deg]' : 'rotate-0'}
                    `}
                    style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
                >
                        <img 
                            src="/mascot.png" 
                            alt="Racer Mascot" 
                            className={`w-[180px] h-auto md:w-[250px] ${!isJumping ? 'animate-bounce' : ''} drop-shadow-2xl translate-y-[-20px]`}
                        />

                    {/* Elastic Landing Shadow */}
                    <div className={`
                        absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/60 rounded-[100%] blur-xl transition-all duration-300
                        ${isJumping ? 'scale-50 opacity-20' : 'scale-100 opacity-100'}
                    `}></div>
                </div>

                {/* 5.4 Floating Gamer Tag */}
                <div className="absolute -top-16 bg-black/40 backdrop-blur-xl px-8 py-3 rounded-[32px] border border-white/20 text-white font-black uppercase text-xs flex items-center gap-4 shadow-2xl transform hover:-translate-y-2 transition-transform">
                    <Zap size={20} className="text-yellow-400" />
                    <span>{child?.name || "Racer 1"}</span>
                    <div className="w-[1px] h-4 bg-white/20"></div>
                    <span className="text-indigo-400 font-black">{xp} XP</span>
                </div>
            </div>

            {/* 6. Dashboard / HUD Controls */}
            <div className="absolute top-10 left-10 z-40 space-y-6">
                <div className="bg-black/30 backdrop-blur-md p-6 rounded-[32px] border border-white/10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-indigo-400/20">
                        <Rocket size={32} />
                    </div>
                    <div>
                        <h4 className="text-4xl font-black text-white italic tracking-tighter">{(speed * 124).toFixed(0)} <span className="text-lg">KM/H</span></h4>
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${speed >= 1 + (i*0.4) ? 'bg-indigo-400 shadow-[0_0_10px_#818cf8]' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Leaderboard Overlay */}
            <div className="absolute right-10 top-10 z-40 hidden md:block w-64 space-y-4">
                <div className="bg-black/50 backdrop-blur-2xl rounded-[40px] border border-white/10 p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <Trophy size={18} className="text-yellow-400" />
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Global Rank</span>
                    </div>
                    {leaderboard.slice(0, 4).map((other, idx) => (
                        <div key={other.id} className={`flex items-center gap-4 group/item ${idx === 0 ? 'scale-110 translate-x-2' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${idx === 0 ? 'bg-yellow-400 text-black shadow-[0_0_15px_#facc15]' : 'bg-slate-800 text-slate-500'}`}>
                                {idx + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-white uppercase truncate">{other.name}</p>
                                <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                                    <div className="h-full bg-indigo-400" style={{ width: `${Math.min(100, (other.totalXp / 1000) * 100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 8. Main Action Buttons */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
                <button 
                    onClick={handleJump}
                    className="w-24 h-24 bg-white/10 backdrop-blur-xl border-4 border-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all group/btn"
                >
                    <ChevronRight size={40} className="-rotate-90 group-hover:animate-bounce" />
                </button>
                
                <button 
                    onClick={triggerBoost}
                    className="px-12 py-6 bg-white text-black font-black text-xl rounded-[40px] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.3)]"
                >
                    FIRE BOOST <Flame size={24} className="text-orange-500 fill-orange-500 animate-pulse" />
                </button>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateX(120vw) translateY(0); }
                    100% { transform: translateX(-120vw) translateY(20px); }
                }
                @keyframes moveTrack {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 100px; }
                }
                @keyframes drive {
                    0%, 100% { transform: translateY(0) rotate(0.5deg); }
                    25% { transform: translateY(-3px) rotate(-0.5deg); }
                    75% { transform: translateY(2px) rotate(0.5deg); }
                }
                .animate-drive {
                    animation: drive 0.1s linear infinite;
                }
                @keyframes particle {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
                    100% { transform: translate(-150px, 60px) scale(0); opacity: 0; }
                }
                @keyframes speedLine {
                    0% { transform: translateX(200%) scaleX(2); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: translateX(-200%) scaleX(2); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
