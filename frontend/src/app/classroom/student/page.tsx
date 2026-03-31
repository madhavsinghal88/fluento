"use client";

import { useState } from "react";
import { joinRoom } from "@/services/api";
import { useRouter } from "next/navigation";
import { Users, Rocket, Sparkles, ChevronRight, Loader2, UserCircle } from "lucide-react";

export default function StudentJoin() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;
    setLoading(true);
    try {
      const { success } = await joinRoom(code.toUpperCase(), name, "emoji_sparkle");
      if (success) {
        // Save local persona for leaderboard
        localStorage.setItem("fluento_player_name", name);
        router.push(`/classroom/live/${code.toUpperCase()}?role=student`);
      } else {
        alert("Enter a valid Room Code!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[64px] shadow-2xl p-12 md:p-20 border-8 border-slate-50 text-center space-y-12 animate-in fade-in zoom-in duration-700">
        
        <div className="space-y-6">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
                <Rocket size={48} />
            </div>
            <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">Join Arena!</h1>
            <p className="text-lg font-bold text-slate-400 capitalize">Fast fingers, high scores! 🏆</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-8">
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block text-left ml-6">Your Battle Name</label>
                <div className="relative">
                    <UserCircle className="absolute top-1/2 -translate-y-1/2 left-6 text-slate-200" size={32} />
                    <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type here..."
                        className="w-full p-6 pl-16 text-xl bg-slate-50 border-4 border-slate-100 rounded-[32px] focus:outline-none focus:ring-8 focus:ring-indigo-100 transition-all font-bold placeholder:italic"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block text-left ml-6">Enter Secret Code</label>
                <input 
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="ABCD123"
                    className="w-full p-8 text-4xl bg-indigo-50 border-4 border-indigo-100 rounded-[32px] text-center font-black uppercase placeholder:opacity-10 tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-indigo-200 transition-all"
                />
            </div>

            <button
                disabled={loading}
                className="w-full py-8 bg-black text-white font-black text-xl rounded-[40px] shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase flex items-center justify-center tracking-widest"
            >
                {loading ? <Loader2 className="animate-spin" /> : <>Join Quest <ChevronRight className="ml-2" /></>}
            </button>
        </form>

        <div className="pt-8 flex items-center justify-center space-x-2 text-slate-300 font-black uppercase text-xs tracking-widest italic">
            <Sparkles size={16} />
            <span>Multiplayer Arena Ready</span>
        </div>
      </div>
    </div>
  );
}
