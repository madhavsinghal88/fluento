"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, Star, Pencil, Lightbulb, Trophy, ArrowRight } from "lucide-react";
import MicButton from "@/components/MicButton";
import ResultCard from "@/components/ResultCard";
import { fetchWordsByLevel, submitSentence, fetchHint, WordDTO, SubmissionResponse, Child, updateChildProgress } from "@/services/api";

export default function WordGame() {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [words, setWords] = useState<WordDTO[]>([]);
  const [selectedWord, setSelectedWord] = useState<WordDTO | null>(null);
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordsLoading, setWordsLoading] = useState(true);
  const [hintLoading, setHintLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [child, setChild] = useState<Child | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("fluento_child");
    if (saved) {
        const parsed = JSON.parse(saved);
        setChild(parsed);
        setXp(parsed.totalXp || 0);
        setLevel(parsed.currentLevel || 1);
    }
  }, []);

  const MOTIVATIONAL_QUOTES = [
    "You're a superstar! ⭐",
    "Keep going, you're doing amazing! 🚀",
    "Believe in yourself! You can do it! 🌈",
    "Mistakes help us learn! Try again! 💪",
    "You're smarter than you think! 🧠",
    "Wow! What a great effort! 🎈",
    "You're on fire! Keep it up! 🔥",
    "Every expert was once a beginner! 🌱",
    "You're making progress every second! ⏰",
    "Shine bright like a diamond! 💎"
  ];

  useEffect(() => {
    loadWords();
  }, [level]);

  const loadWords = async () => {
    setWordsLoading(true);
    setHint(null);
    try {
      const data = await fetchWordsByLevel(level);
      setWords(data);
      if (data.length > 0) setSelectedWord(data[0]);
    } catch (err) {
      setError("Unable to load the quest!");
    } finally {
      setWordsLoading(false);
    }
  };

  const handleHint = async () => {
    if (!selectedWord) return;
    setHintLoading(true);
    try {
      const hintText = await fetchHint(selectedWord.word);
      setHint(hintText);
    } catch (err) {
      setHint("Try starting your own sentence!");
    } finally {
      setHintLoading(false);
    }
  };

  const handleCorrect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentence.trim() || !selectedWord) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await submitSentence({
        sentence,
        word: selectedWord.word,
        level,
        xp
      });
      
      if (data.level > level) {
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 3000);
      }
      
      // Pick random motivation (not same as current)
      let randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      while (randomQuote === motivation) {
          randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      }
      setMotivation(randomQuote);

      setResult(data);
      setLevel(data.level);
      setXp(data.xp);

      // Sync Analytics
      if (child && child.id) {
          const statsTotal = (child.totalQuestions || 0) + 1;
          const statsCorrect = (child.correctAnswers || 0) + (data.correct ? 1 : 0);
          try {
              const updated = await updateChildProgress(child.id, data.xp, data.level, statsTotal, statsCorrect);
              setChild(updated);
              localStorage.setItem("fluento_child", JSON.stringify(updated));
          } catch (e) {
              console.error("Analytics sync fail", e);
          }
      }
    } catch (err: any) {
      setError("Analysis failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextWord = () => {
    setSentence("");
    setResult(null);
    setHint(null);
    const index = words.indexOf(selectedWord!) + 1;
    if (index < words.length) setSelectedWord(words[index]);
    else loadWords(); // Refresh if out of words
  };

  if (wordsLoading) return (
     <div className="h-96 bg-white animate-pulse rounded-[64px] shadow-2xl flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={64} />
     </div>
  );

  return (
    <div className="space-y-10">
        
        {/* Status Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-6 bg-white rounded-[40px] shadow-xl border-4 border-slate-50">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                    {level}
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Level</p>
                    <p className="text-xl font-black text-slate-900 uppercase">Language Hero</p>
                </div>
            </div>

            <div className="flex-1 w-full max-w-md space-y-2">
                <div className="flex justify-between items-end">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Experience</p>
                    <p className="text-sm font-black text-indigo-600">{xp} / 50 XP</p>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-50">
                    <div 
                        className="h-full bg-indigo-600 transition-all duration-700 ease-out shadow-lg" 
                        style={{ width: `${(xp / 50) * 100}%` }}
                    />
                </div>
            </div>
            
            <div className="flex items-center space-x-2 text-[#FFCC00]">
                <Star size={32} fill="currentColor" className="drop-shadow-sm" />
                <span className="text-3xl font-black">{xp}</span>
            </div>
        </div>

        {/* Level Up Notification */}
        {showLevelUp && (
            <div className="fixed inset-x-0 top-32 flex justify-center z-[100] pointer-events-none animate-in zoom-in slide-in-from-top-12 duration-500">
                <div className="bg-[#FFCC00] text-black px-12 py-6 rounded-[32px] shadow-2xl flex items-center space-x-6 border-8 border-white">
                    <Trophy size={64} className="animate-bounce" />
                    <div>
                        <h2 className="text-5xl font-black uppercase">Level Up!</h2>
                        <p className="text-xl font-bold uppercase italic">You are now Level {level}!</p>
                    </div>
                </div>
            </div>
        )}

        {/* Quest Area */}
        <div className="flex flex-col items-center space-y-8">
            <div className="px-8 py-3 bg-[#FFCC00] text-black font-black uppercase rounded-full shadow-lg rotate-1 tracking-widest text-lg">
                Current WordQuest 🔓
            </div>
            {selectedWord && (
                <div className="bg-white p-12 rounded-[64px] shadow-2xl border-8 border-indigo-50 text-center relative overflow-hidden group">
                    <h2 className="text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4">{selectedWord.word}</h2>
                    <p className="text-3xl text-indigo-600 font-bold mb-4">&quot;{selectedWord.meaning}&quot;</p>
                    <div className="px-6 py-3 bg-indigo-50 rounded-3xl text-indigo-700 font-bold italic">
                        {selectedWord.example}
                    </div>
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-[64px] shadow-2xl p-12 border-8 border-indigo-50 relative overflow-hidden group">
            <div className="absolute top-10 right-10 opacity-10 text-indigo-200 rotate-12"><Pencil size={120} /></div>
            
            <form onSubmit={handleCorrect} className="space-y-10 relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-black text-slate-900 uppercase">Your Sentence</h3>
                        {hint ? (
                            <div className="px-6 py-3 bg-amber-50 text-amber-700 font-bold rounded-2xl border-2 border-amber-100 animate-in slide-in-from-right-4">
                                💡 {hint}
                            </div>
                        ) : (
                            <button 
                                type="button" 
                                onClick={handleHint}
                                disabled={hintLoading}
                                className="flex items-center space-x-2 px-6 py-3 bg-amber-100 text-amber-700 font-black rounded-2xl hover:bg-amber-200 transition-all uppercase text-sm"
                            >
                                {hintLoading ? <Loader2 size={20} className="animate-spin" /> : <Lightbulb size={20} />}
                                <span>Get Hint</span>
                            </button>
                        )}
                    </div>
                    <textarea
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        placeholder={`Start writing here...`}
                        className="w-full min-h-[200px] p-10 text-3xl text-slate-900 bg-slate-50 border-4 border-slate-100 rounded-[48px] focus:outline-none focus:ring-[16px] focus:ring-indigo-100 transition-all placeholder:text-slate-200 resize-none font-bold"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <MicButton onTranscription={(text) => setSentence(text)} disabled={loading} />
                    
                    <button
                        type="submit"
                        disabled={loading || !sentence.trim()}
                        className={`inline-flex items-center px-16 py-8 rounded-[32px] font-black text-3xl shadow-2xl shadow-indigo-100 hover:scale-110 active:scale-95 transition-all text-white bg-indigo-600 ${loading || !sentence.trim() ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                        {loading ? <Loader2 size={40} className="animate-spin" /> : "SUMBIT! 🔥"}
                    </button>
                </div>
            </form>
        </div>

        {/* Results Area */}
        {error && (
            <div className="p-12 bg-red-50 rounded-[48px] text-red-600 font-black text-center text-3xl animate-in fade-in duration-300">
                {error} 🚨
            </div>
        )}

        {result && (
            <div className="space-y-8 animate-in slide-in-from-top-12 duration-500">
                <div className={`p-8 rounded-[48px] border-8 ${result.correct ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'} text-center`}>
                    <h3 className="text-4xl font-black uppercase mb-2">{result.correct ? 'Quest Complete!' : 'Try Again!'}</h3>
                    <p className="text-2xl font-bold">{result.feedback}</p>
                    {result.correct && <div className="mt-4 text-[#FFCC00] font-black text-3xl">+ {result.xpEarned} XP</div>}
                </div>
                
                <div className="w-full text-center p-8 bg-indigo-50 rounded-[48px] border-4 border-indigo-100 flex items-center justify-center space-x-4">
                    <Sparkles className="text-indigo-600 animate-bounce" size={32} />
                    <p className="text-3xl font-black text-indigo-700 italic">"{motivation}"</p>
                    <Sparkles className="text-indigo-600 animate-bounce" size={32} />
                </div>

                {result.correct && (
                    <ResultCard result={{ corrected: result.corrected, improved: result.improved, explanation: result.feedback }} />
                )}

                <div className="flex justify-center">
                    <button 
                       onClick={nextWord}
                       className="px-16 py-8 bg-[#FFCC00] text-black font-black text-3xl rounded-[32px] hover:scale-110 active:scale-95 shadow-2xl transition-all uppercase flex items-center"
                    >
                        {result.correct ? "Next Quest" : "Try Next Word"}
                        <ArrowRight size={32} className="ml-4" />
                    </button>
                </div>
            </div>
        )}
    </div>
  );
}
