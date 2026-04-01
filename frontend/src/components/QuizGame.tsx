"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Loader2, RefreshCcw, Star, Trophy, Users, Lock, ChevronRight, UserCircle } from "lucide-react";
import Image from "next/image";
import { fetchCountryQuiz, QuizDTO, loginChild, Child, updateChildProgress } from "@/services/api";

interface QuizGameProps {
  mode: "world" | "india";
}

export default function QuizGame({ mode }: QuizGameProps) {
  const [level, setLevel] = useState<number | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<QuizDTO[]>([]);
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

  // Onboarding state
  const [child, setChild] = useState<Child | null>(null);
  const [onboardingName, setOnboardingName] = useState("");
  const [onboardingAge, setOnboardingAge] = useState(8);
  const [onboardingLoading, setOnboardingLoading] = useState(false);

  // Load profile & unlocked level from localStorage
  useEffect(() => {
    const savedChild = localStorage.getItem("fluento_child");
    if (savedChild) setChild(JSON.parse(savedChild));

    const savedLvl = localStorage.getItem(`unlocked_level_${mode}`);
    if (savedLvl) setUnlockedLevel(parseInt(savedLvl));
    else setUnlockedLevel(1);
  }, [mode]);

  useEffect(() => {
    if (level !== null && child && questions.length === 0) {
      loadQuiz();
    }
  }, [level, child, questions.length]);

  const loadQuiz = async () => {
    if (!level || !child) return;
    setLoading(true);
    try {
      const data = await fetchCountryQuiz(mode, level, child.age);
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

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingName.trim()) return;
    setOnboardingLoading(true);
    try {
        const data = await loginChild(onboardingName, onboardingAge);
        setChild(data);
        localStorage.setItem("fluento_child", JSON.stringify(data));
    } catch (err) {
        console.error(err);
    } finally {
        setOnboardingLoading(false);
    }
  };

  const checkAnswer = async (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);

    // Pick random motivation (not same as current)
    let randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    while (randomQuote === motivation) {
        randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    }
    setMotivation(randomQuote);

    const isCorrect = option === questions[currentIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Auto-scroll to show the 'Next Quest' button
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
    
    // Auto-advance to next quest after 2.5 seconds
    setTimeout(() => {
        nextQuestion();
    }, 2500);
    
    // Update Performance & Sync with backend
    if (child && child.id) {
        const newXp = (child.totalXp || 0) + (isCorrect ? 10 : 0);
        let newLevel = child.currentLevel || 1;
        
        if (newXp >= 50 && isCorrect) {
            newLevel += 1;
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
    // If showResult is already false, we've already manually skipped ahead.
    if (!showResult && !isGameOver) return;
    
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Check for level unlock (unlock if score >= 3)
      if (score >= 3 && level === unlockedLevel && level !== null && level < 5) {
          const next = level + 1;
          setUnlockedLevel(next);
          localStorage.setItem(`unlocked_level_${mode}`, next.toString());
      }
      setIsGameOver(true);
      setShowResult(false);
    }
  };

  // 1. Onboarding Splash
  if (!child) {
      return (
          <div className="max-w-md mx-auto bg-white p-12 rounded-[64px] shadow-2xl border-8 border-indigo-50 animate-in fade-in zoom-in duration-700">
              <div className="text-center space-y-6 mb-10">
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                      <UserCircle size={64} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase">Who is Playing?</h2>
                  <p className="text-slate-400 font-bold uppercase italic tracking-widest text-xs">Let&apos;s start your quest!</p>
              </div>
              <form onSubmit={handleOnboarding} className="space-y-8">
                  <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase ml-4">Super Hero Name</label>
                      <input 
                        required
                        value={onboardingName}
                        onChange={(e) => setOnboardingName(e.target.value)}
                        placeholder="Type your name..."
                        className="w-full p-6 text-xl bg-slate-50 border-4 border-slate-100 rounded-[32px] focus:outline-none focus:ring-8 focus:ring-indigo-100 transition-all font-bold"
                      />
                  </div>
                  <div className="space-y-4">
                      <label className="text-xs font-black text-slate-400 uppercase ml-4">Select Your Rank!</label>
                      <div className="grid grid-cols-1 gap-4">
                          {[
                              { age: 6, label: "Little Scout", range: "4-8 Years", icon: "🌱" },
                              { age: 10, label: "Primary Hero", range: "9-12 Years", icon: "⚔️" },
                              { age: 15, label: "Grand Master", range: "13+ Years", icon: "👑" }
                          ].map((cat) => (
                              <button
                                key={cat.label}
                                type="button"
                                onClick={() => setOnboardingAge(cat.age)}
                                className={`p-6 rounded-[32px] border-4 transition-all text-left flex items-center space-x-6 ${
                                    onboardingAge === cat.age 
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-xl scale-[1.02]" 
                                    : "bg-slate-50 border-slate-50 text-slate-600 hover:border-indigo-100"
                                }`}
                              >
                                <span className="text-4xl">{cat.icon}</span>
                                <div>
                                    <h3 className="font-black text-xl leading-tight uppercase">{cat.label}</h3>
                                    <p className={`text-xs font-bold uppercase tracking-widest ${onboardingAge === cat.age ? 'text-indigo-100' : 'text-slate-400'}`}>
                                        {cat.range}
                                    </p>
                                </div>
                              </button>
                          ))}
                      </div>
                  </div>
                  <button
                    disabled={onboardingLoading}
                    className="w-full py-8 bg-black text-white font-black text-xl rounded-[40px] shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase flex items-center justify-center tracking-widest"
                  >
                    {onboardingLoading ? <Loader2 className="animate-spin" /> : <>Enter Fluento Arena <ChevronRight className="ml-2" /></>}
                  </button>
              </form>
          </div>
      );
  }

  // 2. Level Selection Splash
  if (level === null) {
      return (
          <div className="space-y-12 animate-in fade-in zoom-in duration-500">
              <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white border-4 border-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl">
                          <Trophy size={32} />
                      </div>
                      <div>
                          <p className="text-xs font-black text-slate-400 uppercase">Hello, Hero!</p>
                          <h2 className="text-2xl font-black text-slate-900 uppercase">{child.name}</h2>
                      </div>
                  </div>
                  <div className="bg-[#FFCC00] px-6 py-3 rounded-full text-black font-black uppercase text-xs shadow-lg">
                      Age {child.age} Mode Active ⚡️
                  </div>
              </div>

              <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">Choose Your Quest!</h2>
                  <p className="text-xl md:text-2xl font-bold text-slate-400">Complete one level to unlock the next! 🎁</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {[1, 2, 3, 4, 5].map((l) => {
                      const isLocked = l > unlockedLevel;
                      return (
                          <button
                            key={l}
                            disabled={isLocked}
                            onClick={() => setLevel(l)}
                            className={`group p-8 border-4 rounded-[40px] shadow-2xl transition-all text-center space-y-4 relative ${
                                isLocked 
                                ? "bg-slate-50 border-slate-100 opacity-50 grayscale" 
                                : "bg-white border-slate-50 hover:scale-110 hover:border-indigo-600 shadow-indigo-100 hover:shadow-indigo-200"
                            }`}
                          >
                            {isLocked && <div className="absolute top-4 right-4 text-slate-300"><Lock size={20} /></div>}
                            <div className={`text-6xl font-black ${isLocked ? 'text-slate-300' : 'text-indigo-600'} group-hover:scale-125 transition-transform`}>
                                {l}
                            </div>
                            <div className={`text-xs font-black uppercase tracking-widest ${isLocked ? 'text-slate-300' : 'text-slate-400'}`}>
                                {isLocked ? "Locked" : "Level"}
                            </div>
                          </button>
                      );
                  })}
              </div>
          </div>
      );
  }

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center p-32 space-y-8 animate-pulse text-indigo-600">
              <Loader2 className="animate-spin" size={80} />
              <h2 className="text-3xl font-black uppercase tracking-widest">Entering Quest...</h2>
          </div>
      );
  }

  if (isGameOver) {
    const isSuccess = score >= 3;
    return (
      <div className="text-center space-y-12 animate-in zoom-in duration-700 max-w-2xl mx-auto">
        <div className="relative">
            <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-20 animate-pulse rounded-full"></div>
            <h2 className="text-8xl md:text-9xl mb-4 relative z-10">{isSuccess ? "🎉" : "💪"}</h2>
        </div>
        <div className="space-y-4">
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter">
                {isSuccess ? "Epic Win!" : "Try Again!"}
            </h3>
            <p className="text-2xl font-bold text-slate-400">
                You scored <span className="text-indigo-600 font-black">{score} / 5</span> correct!
            </p>
        </div>
        
        {isSuccess && level !== null && level < 5 && (
            <div className="bg-indigo-50 p-8 rounded-[40px] border-4 border-indigo-100 animate-bounce">
                <p className="text-xl font-black text-indigo-700 uppercase">🛡️ Level {level + 1} Unlocked! 🛡️</p>
            </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button
                onClick={() => {setLevel(null); setIsGameOver(false);}}
                className="px-12 py-6 bg-slate-900 text-white font-black text-xl rounded-[32px] hover:scale-110 active:scale-95 transition-all shadow-2xl uppercase"
            >
                Map View
            </button>
            <button
                onClick={loadQuiz}
                className="px-12 py-6 bg-indigo-600 text-white font-black text-xl rounded-[32px] hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-indigo-200 uppercase flex items-center"
            >
               Retry Mission <RefreshCcw className="ml-3" />
            </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* Progress Header */}
      <div className="flex items-center justify-between px-10 py-6 bg-white rounded-[40px] shadow-xl border-4 border-slate-50">
          <div className="flex space-x-3">
              {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 w-12 rounded-full transition-all duration-500 ${
                        i < currentIndex ? "bg-indigo-600" : 
                        i === currentIndex ? "bg-[#FFCC00] animate-pulse scale-110" : 
                        "bg-slate-100"
                    }`} 
                  />
              ))}
          </div>
          <div className="flex items-center space-x-3 text-2xl font-black text-slate-900">
              <Star className="text-[#FFCC00]" fill="currentColor" size={32} />
              <span>{score}</span>
          </div>
      </div>

      <div className="bg-white rounded-[80px] shadow-2xl p-12 md:p-16 border-8 border-indigo-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-xs font-black text-slate-100 uppercase tracking-widest rotate-12 group-hover:rotate-0 transition-transform">
            Mission: Level {level}
        </div>
        
        {currentQ && (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left side: Question & Motivation */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-indigo-600 px-6 py-2 rounded-full text-white font-black uppercase text-xs tracking-widest shadow-xl self-center lg:self-start">
                    <Sparkles size={16} />
                    <span>Active Quest</span>
                </div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-tight">
                    {currentQ.question}
                </h2>
                
                {showResult && (
                  <div className="animate-in fade-in zoom-in duration-500 text-left p-6 bg-indigo-50 rounded-[32px] border-4 border-indigo-100 flex items-center space-x-4 shadow-inner mt-8">
                      <Sparkles className="text-indigo-600 animate-spin-slow shrink-0" size={32} />
                      <p className="text-xl lg:text-2xl font-black text-indigo-700 italic leading-snug">"{motivation}"</p>
                  </div>
                )}
            </div>

            {/* Right side: Options */}
            <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 gap-4">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQ.answer;
                    
                    let bgColor = "bg-slate-50 hover:bg-white border-slate-50 hover:border-indigo-200 hover:scale-[1.03]";
                    if (showResult) {
                      if (isCorrect) bgColor = "bg-green-500 border-green-500 text-white scale-105 shadow-green-100 z-10";
                      else if (isSelected) bgColor = "bg-red-500 border-red-500 text-white opacity-40 scale-95";
                      else bgColor = "bg-slate-50 opacity-20 border-slate-50 grayscale scale-95";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={showResult}
                        onClick={() => checkAnswer(option)}
                        className={`p-6 md:p-8 text-xl md:text-2xl font-black rounded-[32px] border-4 shadow-xl transition-all text-left flex items-center justify-between group ${bgColor}`}
                      >
                        {option}
                        {!showResult && <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-300" />}
                      </button>
                    );
                  })}
                </div>

                {showResult && (
                  <div className="pt-6 animate-in slide-in-from-bottom-4 duration-500">
                    <button
                      onClick={nextQuestion}
                      className="w-full py-6 bg-slate-900 text-white font-black text-2xl rounded-[32px] hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-100 transition-all uppercase flex items-center justify-center group"
                    >
                      {currentIndex + 1 === questions.length ? "Final Score" : "Next Quest"}
                      <ArrowRight className="ml-4 group-hover:translate-x-4 transition-transform" size={28} />
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
