"use client";

import { useEffect, useState } from "react";
import { fetchLeaderboard, Child } from "@/services/api";
import { Trophy, Star, Target, Sparkles, Medal, ArrowUpRight, Flame } from "lucide-react";

export default function Rankings() {
    const [leaderboard, setLeaderboard] = useState<Child[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRanking = async () => {
            try {
                const data = await fetchLeaderboard();
                setLeaderboard(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadRanking();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-32 space-y-8 animate-pulse text-indigo-600 h-screen">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center animate-spin">
                    <Medal size={40} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-widest">Calculating Standings...</h2>
            </div>
        );
    }

    const top3 = leaderboard.slice(0, 3);
    const others = leaderboard.slice(3);

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6">
            <div className="max-w-5xl mx-auto space-y-20">
                
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center space-x-3 bg-[#FFCC00] px-8 py-3 rounded-full text-black font-black uppercase text-sm shadow-xl rotate-[-2deg]">
                        <Trophy size={24} />
                        <span>Hall of Fame 🏆</span>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-tight tracking-tighter">
                        Fluento <br />
                        <span className="text-indigo-600 underline decoration-[#FFCC00] decoration-[12px] underline-offset-[10px]">Leaderboard</span>
                    </h1>
                </div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end pt-20">
                    {/* Rank 2 */}
                    {top3[1] && (
                        <div className="bg-white p-10 rounded-[64px] border-8 border-slate-50 shadow-2xl relative group order-2 md:order-1 h-[400px] flex flex-col items-center justify-center space-y-6">
                            <div className="absolute -top-12 w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
                                <Medal size={48} className="text-slate-400" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 uppercase text-center mt-6">{top3[1].name}</h3>
                            <div className="bg-indigo-50 px-6 py-2 rounded-full text-indigo-600 font-black text-sm">LEVEL {top3[1].currentLevel}</div>
                            <div className="text-5xl font-black text-indigo-600">{top3[1].totalXp} XP</div>
                            <div className="p-4 bg-slate-50 rounded-3xl w-full flex justify-between items-center">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Accuracy</span>
                                <span className="text-xl font-black text-slate-900">{(top3[1].accuracy || 0).toFixed(1)}%</span>
                            </div>
                        </div>
                    )}

                    {/* Rank 1 */}
                    {top3[0] && (
                        <div className="bg-white p-12 rounded-[80px] border-8 border-[#FFCC00] shadow-2xl relative group order-1 md:order-2 h-[500px] flex flex-col items-center justify-center space-y-8 scale-110 z-10">
                            <div className="absolute -top-16 w-32 h-32 bg-[#FFCC00] rounded-full flex items-center justify-center border-8 border-white shadow-2xl animate-bounce">
                                <Trophy size={64} className="text-black" />
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mt-8">{top3[0].name}</h3>
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Grand Champion 👑</p>
                            </div>
                            <div className="bg-[#FFCC00] px-10 py-4 rounded-full text-black font-black text-xl shadow-xl">LEVEL {top3[0].currentLevel}</div>
                            <div className="text-7xl font-black text-indigo-600">{top3[0].totalXp} XP</div>
                            <div className="p-6 bg-indigo-50 rounded-[32px] w-full flex flex-col gap-2 justify-center items-center group-hover:bg-indigo-100 transition-colors text-center">
                                <span className="text-sm font-black text-indigo-400 uppercase tracking-widest">Mastery Accuracy</span>
                                <span className="text-4xl font-black text-indigo-700">{(top3[0].accuracy || 0).toFixed(1)}%</span>
                            </div>
                        </div>
                    )}

                    {/* Rank 3 */}
                    {top3[2] && (
                        <div className="bg-white p-10 rounded-[64px] border-8 border-slate-50 shadow-2xl relative group order-3 h-[350px] flex flex-col items-center justify-center space-y-6">
                            <div className="absolute -top-12 w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
                                <Medal size={48} className="text-orange-900" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 uppercase text-center mt-6">{top3[2].name}</h3>
                            <div className="bg-indigo-50 px-6 py-2 rounded-full text-indigo-600 font-black text-sm">LEVEL {top3[2].currentLevel}</div>
                            <div className="text-5xl font-black text-indigo-600">{top3[2].totalXp} XP</div>
                            <div className="p-4 bg-slate-50 rounded-3xl w-full flex justify-between items-center">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Accuracy</span>
                                <span className="text-xl font-black text-slate-900">{(top3[2].accuracy || 0).toFixed(1)}%</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Remaining List */}
                <div className="bg-white rounded-[64px] shadow-2xl border-8 border-slate-50 overflow-hidden">
                    <div className="p-10 border-b-4 border-slate-50 bg-slate-50/50 flex justify-between items-center">
                        <h4 className="text-2xl font-black text-slate-900 uppercase">Rising Stars 🚀</h4>
                        <div className="flex space-x-10">
                            <span className="text-xs font-black text-slate-400 uppercase">Mastery</span>
                            <span className="text-xs font-black text-slate-400 uppercase">XP</span>
                        </div>
                    </div>
                    
                    <div className="divide-y-4 divide-slate-50">
                        {others.length > 0 ? others.map((child, idx) => (
                            <div key={child.id} className="p-10 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                                <div className="flex items-center space-x-10">
                                    <span className="text-3xl font-black text-slate-300 w-8">{idx + 4}</span>
                                    <div className="space-y-1">
                                        <h5 className="text-3xl font-black text-slate-900 uppercase group-hover:text-indigo-600 transition-colors">{child.name}</h5>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Ranked Warrior</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-16">
                                    <div className="text-right">
                                        <p className="text-xl font-black text-slate-900">{(child.accuracy || 0).toFixed(1)}%</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ACCURACY</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-indigo-600">{child.totalXp}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TOTAL XP</p>
                                    </div>
                                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg group-hover:scale-110">
                                        <ArrowUpRight size={32} />
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center text-slate-300 font-black text-3xl uppercase italic">
                                Be the first rising star! 🌟
                            </div>
                        )}
                    </div>
                </div>

                {/* Analytics Snapshot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="bg-indigo-600 p-12 rounded-[64px] shadow-2xl relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 p-12 opacity-10"><Target size={160} /></div>
                        <h3 className="text-4xl font-black uppercase mb-8 leading-tight">Global <br /> Performance</h3>
                        <div className="grid grid-cols-2 gap-10 relative z-10">
                            <div>
                                <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Avg. Accuracy</p>
                                <p className="text-5xl font-black">
                                    {(leaderboard.reduce((a, b) => a + (b.accuracy || 0), 0) / (leaderboard.length || 1)).toFixed(1)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Active Heroes</p>
                                <p className="text-5xl font-black">{leaderboard.length}</p>
                            </div>
                        </div>
                   </div>
                   
                   <div className="bg-black p-12 rounded-[64px] shadow-2xl relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 p-12 opacity-10"><Flame size={160} /></div>
                        <h3 className="text-4xl font-black uppercase mb-8 leading-tight">Community <br /> Streak</h3>
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-[#FF5722] rounded-3xl flex items-center justify-center shadow-xl animate-bounce">
                                <Flame size={48} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Lessons Mastered</p>
                                <p className="text-5xl font-black">{(leaderboard.reduce((a, b) => a + (b.totalQuestions || 0), 0)) * 7}+</p>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
}
