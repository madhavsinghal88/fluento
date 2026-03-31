"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Loader2, RefreshCcw, Star, Trophy, Lock, ChevronRight, Building2, CarFront } from "lucide-react";
import Image from "next/image";
import { fetchLogoQuiz, LogoQuizDTO, updateChildProgress, Child } from "@/services/api";

export default function LogoGame() {
  const [mode, setMode] = useState<"companies" | "cars" | null>(null);
  const [level, setLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<LogoQuizDTO[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [motivation, setMotivation] = useState("");

  const MOTIVATIONAL_QUOTES = [
    "You're a superstar! ⭐",
    "Keep going, you're doing amazing! 🚀",
    "Believe in yourself! You can do it! 🌈",
    "Mistakes help us learn! Keep growing! 💪",
    "You're smarter than you think! 🧠",
    "Wow! What a great effort! 🎈",
    "You're on fire! Keep it up! 🔥",
    "Every expert was once a beginner! 🌱",
    "You're making progress every second! ⏰",
    "Shine bright like a diamond! 💎"
  ];

  // Child data for XP/Level
  const [child, setChild] = useState<Child | null>(null);

  useEffect(() => {
    const savedChild = localStorage.getItem("fluento_child");
    if (savedChild) setChild(JSON.parse(savedChild));
  }, []);

  useEffect(() => {
    if (mode) loadQuiz();
  }, [mode, level]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const data = await fetchLogoQuiz(mode!, level);
      setQuestions(data);
      setCurrentIndex(0);
      setScore(0);
      setIsGameOver(false);
      setShowResult(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    
    // Pick random motivation (not same as current if possible)
    let randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    while (randomQuote === motivation) {
        randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    }
    setMotivation(randomQuote);

    const isCorrect = option === questions[currentIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Update Performance & Sync with backend
    if (child && child.id) {
        const newXp = (child.totalXp || 0) + (isCorrect ? 10 : 0);
        let newLevel = child.currentLevel || 1;
        
        if (newXp >= 50 && isCorrect) {
            newLevel += 1;
            // newXp = newXp - 50; // Optional logic
        }

        const statsTotal = (child.totalQuestions || 0) + 1;
        const statsCorrect = (child.correctAnswers || 0) + (isCorrect ? 1 : 0);
        
        try {
            const updated = await updateChildProgress(child.id, newXp, newLevel, statsTotal, statsCorrect);
            setChild(updated);
            localStorage.setItem("fluento_child", JSON.stringify(updated));
        } catch (e) {
            console.error("XP Sync fail", e);
        }
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsGameOver(true);
      // Automatically unlock next level if score is good? 
      // For now, let the user click "Next Level" on the game over screen
    }
  };

  const goToNextLevel = () => {
      if (level < 10) {
          setLevel(level + 1);
          setIsGameOver(false);
          setScore(0);
          setCurrentIndex(0);
      } else {
          setMode(null); // End of game
      }
  };

  // 1. Initial Mode Selection
  if (!mode) {
      return (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in duration-500">
              <div className="text-center space-y-6">
                  <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">Logo Mastermind</h1>
                  <p className="text-2xl font-bold text-slate-400">Can you identify these famous brands? 🕵️‍♂️</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button 
                    onClick={() => setMode("companies")}
                    className="group bg-white p-12 rounded-[64px] border-8 border-indigo-50 shadow-2xl hover:scale-105 active:scale-95 transition-all text-center space-y-6"
                  >
                      <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600 group-hover:rotate-12 transition-transform">
                          <Building2 size={64} />
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 uppercase">Corporate Giants</h3>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic text-center">Tech, Food & Fashion</p>
                  </button>

                  <button 
                    onClick={() => setMode("cars")}
                    className="group bg-white p-12 rounded-[64px] border-8 border-orange-50 shadow-2xl hover:scale-105 active:scale-95 transition-all text-center space-y-6"
                  >
                      <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600 group-hover:-rotate-12 transition-transform">
                          <CarFront size={64} />
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 uppercase">Super Cars</h3>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic text-center">Speed & Luxury</p>
                  </button>
              </div>
          </div>
      );
  }

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center p-32 space-y-8 animate-pulse text-indigo-600">
              <Loader2 className="animate-spin" size={80} />
              <h2 className="text-3xl font-black uppercase tracking-widest">Scanning Logos...</h2>
          </div>
      );
  }

  if (isGameOver) {
      return (
          <div className="text-center space-y-12 animate-in zoom-in duration-700 max-w-2xl mx-auto">
              <h2 className="text-9xl mb-4">🏆</h2>
              <div className="space-y-4">
                  <h3 className="text-7xl font-black text-slate-900 uppercase italic tracking-tighter">Mission Done!</h3>
                  <p className="text-2xl font-bold text-slate-400">
                      You identified <span className="text-indigo-600 font-black">{score} / {questions.length}</span> brands!
                  </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <button onClick={() => setMode(null)} className="px-12 py-6 bg-slate-900 text-white font-black text-xl rounded-[32px] hover:scale-110 active:scale-95 transition-all shadow-2xl uppercase">Home</button>
                  {score >= questions.length * 0.6 && level < 10 ? (
                      <button onClick={goToNextLevel} className="px-12 py-6 bg-green-600 text-white font-black text-xl rounded-[32px] hover:scale-110 active:scale-95 transition-all shadow-2xl uppercase flex items-center">
                          Next Level <ChevronRight className="ml-2" />
                      </button>
                  ) : (
                      <button onClick={loadQuiz} className="px-12 py-6 bg-indigo-600 text-white font-black text-xl rounded-[32px] hover:scale-110 active:scale-95 transition-all shadow-2xl uppercase">Re-Run Mission</button>
                  )}
              </div>
          </div>
      );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* Stats Header */}
      <div className="flex items-center justify-between px-10 py-6 bg-white rounded-[40px] shadow-xl border-4 border-slate-50">
          <div className="flex items-center space-x-12">
              <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Active Mission</p>
                  <p className="text-xl font-black text-slate-900 uppercase italic whitespace-nowrap">Mission {level} / 10</p>
              </div>
              <div className="flex space-x-2">
                  {questions.map((_, i) => (
                      <div key={i} className={`h-3 w-6 rounded-full ${i < currentIndex ? "bg-indigo-600" : i === currentIndex ? "bg-indigo-200 animate-pulse" : "bg-slate-100"}`} />
                  ))}
              </div>
          </div>
          <div className="flex items-center space-x-8">
              <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero XP</p>
                  <p className="text-xl font-black text-indigo-600">{child?.totalXp || 0}</p>
              </div>
              <div className="h-10 w-[2px] bg-slate-100"></div>
              <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery</p>
                  <p className="text-xl font-black text-slate-900">{child?.currentLevel || 1}</p>
              </div>
          </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-white rounded-[80px] shadow-2xl p-12 md:p-20 border-8 border-slate-50 relative overflow-hidden">
          {currentQ && (
              <div className="flex flex-col lg:flex-row items-center gap-20">
                  
                  {/* Logo Display */}
                  <div className="w-full lg:w-1/2 flex justify-center h-[300px] relative">
                      <div className="absolute inset-0 bg-indigo-50 rounded-[48px] blur-2xl opacity-30 animate-pulse"></div>
                      <div className="relative z-10 p-12 bg-white rounded-[48px] shadow-lg border-4 border-slate-50 flex items-center justify-center w-full overflow-hidden">
                          {currentQ.image && !showResult ? (
                            <img 
                                src={currentQ.image} 
                                alt="Logo Guess"
                                className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-all duration-700 relative z-20"
                                onLoad={(e) => {
                                    // Hide the fallback initial behind it
                                    const fallback = e.currentTarget.parentElement?.querySelector(".fallback-initial");
                                    if (fallback) (fallback as HTMLElement).style.opacity = "0";
                                }}
                                onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    const domain = currentQ.image.split("/").pop()?.split("?")[0] || "";
                                    
                                    // Layer 1 Fallback: Google's Icon Service (Extremely high availability)
                                    if (!img.src.includes("google.com/s2/favicons")) {
                                        img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                                    } else {
                                        // Final Layer: Hidden, fallback text shows
                                        img.style.display = "none";
                                        const fallback = img.parentElement?.querySelector(".fallback-initial");
                                        if (fallback) (fallback as HTMLElement).style.opacity = "0.5";
                                    }
                                }}
                            />
                          ) : null}
                          
                          {/* Visual Fallback / Initials when image is hidden or loading fails */}
                          <div className="fallback-initial absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500">
                              <span className="text-[12rem] font-black text-slate-100 uppercase select-none">
                                  {currentQ.answer?.charAt(0)}
                              </span>
                          </div>
                      </div>
                  </div>

                  {/* Options */}
                  <div className="w-full lg:w-1/2 space-y-4">
                      <div className="mb-8">
                          <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 underline decoration-indigo-200 underline-offset-4">Identify This Brand</p>
                          <h2 className="text-5xl font-black text-slate-900 uppercase">Who am I?</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                          {currentQ.options.map((opt) => {
                              const isCorrect = opt === currentQ.answer;
                              const isSelected = selectedOption === opt;
                              
                              let btnClass = "bg-slate-50 border-slate-50 text-slate-700 hover:border-indigo-200 hover:bg-white hover:scale-[1.02]";
                              if (showResult) {
                                  if (isCorrect) btnClass = "bg-green-500 border-green-500 text-white scale-105 shadow-green-100 z-10";
                                  else if (isSelected) btnClass = "bg-red-500 border-red-500 text-white opacity-50";
                                  else btnClass = "bg-slate-50 opacity-20 border-slate-50 grayscale scale-95";
                              }

                              return (
                                  <button
                                    key={opt}
                                    disabled={showResult}
                                    onClick={() => handleAnswer(opt)}
                                    className={`p-6 text-2xl font-black rounded-[32px] border-4 transition-all uppercase tracking-tight text-left flex items-center justify-between group ${btnClass}`}
                                  >
                                      {opt}
                                      {!showResult && <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                                  </button>
                              );
                          })}
                      </div>

                      {showResult && (
                          <div className="pt-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                              <div className="text-center p-6 bg-indigo-50 rounded-[32px] border-4 border-indigo-100 flex items-center justify-center space-x-3">
                                  <Sparkles className="text-indigo-600 animate-bounce" />
                                  <p className="text-2xl font-black text-indigo-700 italic">"{motivation}"</p>
                                  <Sparkles className="text-indigo-600 animate-bounce" />
                              </div>
                              <button 
                                onClick={nextQuestion}
                                className="w-full py-8 bg-indigo-600 text-white font-black text-2xl rounded-[32px] shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase flex items-center justify-center tracking-widest"
                              >
                                {currentIndex + 1 === questions.length ? "Finish Mastery" : "Next Brand"}
                                <ArrowRight className="ml-3" size={32} />
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}
