"use client";

import { useState } from "react";
import { createRoom } from "@/services/api";
import { useRouter } from "next/navigation";
import { Plus, Users, Monitor, Sparkles } from "lucide-react";

export default function TeacherDashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const { roomCode } = await createRoom("teacher-123");
      router.push(`/classroom/live/${roomCode}?role=teacher`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-[64px] shadow-2xl p-12 md:p-20 border-8 border-slate-50 text-center space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="space-y-6">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                <Monitor size={64} />
            </div>
            <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">Teacher Hub</h1>
            <p className="text-2xl font-bold text-slate-400">Host a live session and watch your students shine! 🌟</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
                onClick={handleCreateRoom}
                disabled={loading}
                className="group p-10 bg-indigo-600 text-white rounded-[40px] shadow-2xl hover:scale-105 active:scale-95 transition-all text-center space-y-4"
            >
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform">
                    <Plus size={32} />
                </div>
                <h3 className="text-3xl font-black uppercase">Create Room</h3>
                <p className="text-indigo-100 font-bold uppercase text-[10px] tracking-widest italic">Start a New Live Quest</p>
            </button>

            <div className="p-10 bg-slate-50 text-slate-400 rounded-[40px] border-4 border-slate-100 flex flex-col justify-center space-y-4">
                <div className="bg-slate-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Users size={32} />
                </div>
                <h3 className="text-3xl font-black uppercase">Recent Rooms</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest italic">Coming soon: Session History</p>
            </div>
        </div>

        <div className="pt-8 flex items-center justify-center space-x-2 text-indigo-400 font-black uppercase text-xs tracking-widest italic">
            <Sparkles size={16} />
            <span>Powered by AI-Generated Quests</span>
        </div>
      </div>
    </div>
  );
}
