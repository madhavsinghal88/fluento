"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Users, Trophy, Play, Star, Sparkles, Loader2, ArrowRight, ShieldCheck, UserCircle, Timer } from "lucide-react";
import { QuizDTO } from "@/services/api";

type Player = { name: string; avatar: string; score: number };

export default function LiveRoomPage() {
  const { code } = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // teacher or student
  const router = useRouter();

  const [status, setStatus] = useState<"WAITING" | "LIVE" | "FINISHED">("WAITING");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizDTO | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timer, setTimer] = useState(15);
  
  const stompClient = useRef<Client | null>(null);
  const playerName = useRef<string | null>(null);

  useEffect(() => {
    playerName.current = localStorage.getItem("fluento_player_name");

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8080/ws-classroom";
    const socket = new SockJS(wsUrl);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to Classroom WS");
        client.subscribe(`/topic/room/${code}`, (message) => {
          const body = JSON.parse(message.body);
          handleWebSocketMessage(body);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, [code]);

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case "PLAYER_JOINED":
        setPlayers(data.allPlayers || []);
        break;
      case "QUIZ_STARTED":
        setStatus("LIVE");
        setCurrentQuestion(data.question);
        setQuestionIndex(0);
        setTimer(15);
        break;
      case "NEW_QUESTION":
        setCurrentQuestion(data.question);
        setQuestionIndex(data.index);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimer(15);
        break;
      case "LEADERBOARD_UPDATE":
        setPlayers(data.players || []);
        break;
      case "QUIZ_FINISHED":
        setStatus("FINISHED");
        break;
    }
  };

  const startQuiz = () => {
    if (stompClient.current) {
      stompClient.current.publish({ destination: `/app/room/${code}/start` });
    }
  };

  const submitAnswer = (option: string) => {
    if (selectedAnswer || showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);
    if (stompClient.current) {
      stompClient.current.publish({
        destination: `/app/room/${code}/answer`,
        body: JSON.stringify({ playerName: playerName.current, answer: option }),
      });
    }
  };

  const nextQuestion = () => {
    if (stompClient.current) {
      stompClient.current.publish({ destination: `/app/room/${code}/next` });
    }
  };

  // 1. Lobby View (Waiting for Players)
  if (status === "WAITING") {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-12 flex flex-col items-center space-y-16 overflow-hidden">
        <div className="fixed top-10 right-10 text-[#FFCC00] animate-pulse"><Sparkles size={48} /></div>
        
        <div className="text-center space-y-4">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400">Join Fluento Quest at your Browser</p>
            <h1 className="text-[12rem] font-black tracking-tighter leading-none">{code}</h1>
            <div className="inline-flex items-center space-x-3 bg-white/10 px-8 py-3 rounded-full text-indigo-200">
                <Users size={24} />
                <span className="text-2xl font-bold">{(players || []).length} Students Ready</span>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full max-w-6xl">
            {(players || []).map((p, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-[40px] text-center border-4 border-white/10 animate-in zoom-in duration-500">
                    <UserCircle size={64} className="mx-auto mb-4 text-indigo-400" />
                    <p className="text-xl font-black uppercase truncate">{p.name}</p>
                </div>
            ))}
        </div>

        {role === "teacher" && (
            <button 
                onClick={startQuiz}
                className="px-20 py-10 bg-[#FFCC00] text-black rounded-[48px] font-black text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center uppercase tracking-tighter"
            >
                Start Quiz! <Play className="ml-6 fill-current" size={40} />
            </button>
        )}
      </div>
    );
  }

  // 2. Gameplay View
  if (status === "LIVE" && currentQuestion) {
    return (
        <div className="min-h-screen bg-white p-10 flex flex-col">
            <div className="flex justify-between items-center mb-16">
                <div className="flex items-center space-x-6">
                    <div className="bg-slate-900 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black italic">
                        {questionIndex + 1}
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-indigo-50 px-10 py-4 rounded-full text-indigo-600 font-black text-2xl animate-pulse">
                    <Timer size={32} />
                    <span>{timer}s</span>
                </div>

                <div className="flex items-center space-x-4">
                    <ShieldCheck size={32} className="text-green-500" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-widest">Arena Live Sync Active</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center space-y-20">
                <h2 className="text-6xl md:text-8xl font-black text-slate-800 text-center leading-[0.9] tracking-tighter max-w-5xl">
                    {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {currentQuestion.options.map((opt, idx) => {
                        const isSelected = selectedAnswer === opt;
                        const isCorrect = opt === currentQuestion.answer;
                        
                        let btnClass = "bg-slate-50 border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-white hover:scale-105";
                        if (showFeedback) {
                            if (isCorrect) btnClass = "bg-green-500 border-green-500 text-white scale-110 shadow-green-200 z-10";
                            else if (isSelected) btnClass = "bg-red-500 border-red-500 text-white opacity-50";
                            else btnClass = "bg-slate-50 opacity-20 border-slate-50 grayscale";
                        }

                        return (
                            <button
                                key={idx}
                                disabled={showFeedback}
                                onClick={() => submitAnswer(opt)}
                                className={`p-8 text-3xl md:text-5xl font-black rounded-[48px] border-8 shadow-2xl transition-all text-center leading-tight ${btnClass}`}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>

            {role === "teacher" && showFeedback && (
                <div className="flex justify-center py-10 animate-in slide-in-from-bottom-8 duration-500">
                    <button 
                        onClick={nextQuestion}
                        className="px-16 py-8 bg-black text-white font-black text-3xl rounded-[40px] hover:scale-110 active:scale-95 shadow-2xl transition-all flex items-center group uppercase tracking-widest"
                    >
                        Next Question
                        <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" size={40} />
                    </button>
                </div>
            )}
        </div>
    );
  }

  // 3. Finished View (Final Leaderboard)
  if (status === "FINISHED") {
      const top3 = [...(players || [])].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 3);
      return (
          <div className="min-h-screen bg-slate-900 text-white p-20 flex flex-col items-center space-y-16 overflow-hidden">
              <h1 className="text-9xl font-black italic tracking-tighter uppercase text-center leading-none">Class Winners!</h1>
              
              <div className="flex items-end justify-center space-x-10 pt-20">
                  {/* Podium Rank 2 */}
                  {top3[1] && (
                      <div className="flex flex-col items-center space-y-4">
                          <p className="text-3xl font-black uppercase">{top3[1].name}</p>
                          <div className="w-56 h-72 bg-white/10 border-4 border-white/20 rounded-t-[40px] flex flex-col items-center justify-center p-8 space-y-2">
                              <Star className="text-slate-300" size={48} />
                              <p className="text-5xl font-black">2ND</p>
                              <p className="text-xl font-bold opacity-50 uppercase tracking-widest italic">{top3[1].score || 0} PTS</p>
                          </div>
                      </div>
                  )}

                  {/* Podium Rank 1 */}
                  {top3[0] && (
                      <div className="flex flex-col items-center space-y-8 animate-bounce delay-500">
                          <p className="text-5xl font-black uppercase tracking-tighter">{top3[0].name}</p>
                          <div className="w-64 h-[500px] bg-indigo-600 border-8 border-[#FFCC00] rounded-t-[50px] flex flex-col items-center justify-center p-8 space-y-4 shadow-[#FFCC00]/20 shadow-2xl">
                              <Trophy className="text-[#FFCC00]" size={80} fill="currentColor" />
                              <p className="text-7xl font-black">1ST</p>
                              <p className="text-2xl font-bold opacity-80 uppercase tracking-widest italic">{top3[0].score || 0} PTS</p>
                          </div>
                      </div>
                  )}

                  {/* Podium Rank 3 */}
                  {top3[2] && (
                      <div className="flex flex-col items-center space-y-4">
                          <p className="text-3xl font-black uppercase">{top3[2].name}</p>
                          <div className="w-56 h-48 bg-white/5 border-4 border-white/10 rounded-t-[40px] flex flex-col items-center justify-center p-8 space-y-2">
                              <Star className="text-orange-900 opacity-50" size={32} />
                              <p className="text-4xl font-black">3RD</p>
                              <p className="text-lg font-bold opacity-30 uppercase tracking-widest italic">{top3[2].score || 0} PTS</p>
                          </div>
                      </div>
                  )}
              </div>

              <button onClick={() => router.push("/")} className="px-16 py-8 bg-white text-black font-black text-2xl rounded-[40px] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all">Back to Home</button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={80} />
    </div>
  );
}
