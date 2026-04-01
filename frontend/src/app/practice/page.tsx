"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Loader2, RefreshCcw, Star, Trophy, Users, Lightbulb } from "lucide-react";
import MicButton from "@/components/MicButton";
import WordCard from "@/components/WordCard";
import ResultCard from "@/components/ResultCard";
import Image from "next/image";
import { fetchWordsByLevel, correctSentence, WordDTO, CorrectionResponse, fetchHint } from "@/services/api";

export default function PracticePage() {
  const [sentence, setSentence] = useState("");
  const [dailyWords, setDailyWords] = useState<WordDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [wordsLoading, setWordsLoading] = useState(true);
  const [result, setResult] = useState<CorrectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    loadWords();
  }, []);

  const handleWordSelect = (word: string) => {
    setSelectedWord(word);
    setSentence(`I am ${word.toLowerCase()} `);
    // Move focus to textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const loadWords = async () => {
    setWordsLoading(true);
    setError(null);
    try {
      const words = await fetchWordsByLevel(1);
      setDailyWords(words); 
    } catch (err: any) {
      setError("Unable to load the game board.");
    } finally {
      setWordsLoading(false);
    }
  };

  const handleCorrect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentence.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setHint(null);

    try {
      const data = await correctSentence(sentence);
      setResult(data);
    } catch (err: any) {
      setError("Something went wrong on the server!");
    } finally {
      setLoading(false);
    }
  };

  const getHint = async () => {
    if (dailyWords.length === 0) return;
    setHintLoading(true);
    try {
      // Get hint for the first word as a default or random one
      const wordToHint = dailyWords[Math.floor(Math.random() * dailyWords.length)].word;
      const hintText = await fetchHint(wordToHint);
      setHint(hintText);
    } catch (err) {
      console.error(err);
    } finally {
      setHintLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-12 px-4 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute top-10 right-10 opacity-10 rotate-12 scale-150"><Users size={120} className="text-blue-600" /></div>
      <div className="absolute bottom-10 left-10 opacity-10 -rotate-12 scale-150"><Trophy size={120} className="text-amber-500" /></div>

      <div className="max-w-6xl w-full space-y-16">
        
        {/* Daily Words Section */}
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="px-6 py-2 bg-[#FFCC00] text-black font-black uppercase rounded-full shadow-lg rotate-2 tracking-widest text-sm">
                Unlock Daily Words! 🔓
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center">
                Today&apos;s Words
                <Star size={40} className="ml-4 text-[#FFCC00]" fill="currentColor" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {wordsLoading ? (
               Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-60 bg-slate-100 animate-pulse rounded-[40px]"></div>
               ))
            ) : (
                dailyWords.map((word, index) => (
                    <WordCard 
                        key={index} 
                        word={word} 
                        onSelect={handleWordSelect}
                        isSelected={selectedWord === word.word}
                    />
                ))
            )}
          </div>
        </div>

        <div className="w-full h-1 bg-slate-100 rounded-full opacity-50"></div>

        {/* Practice Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Mascot Side */}
            <div className="lg:col-span-4 flex flex-col items-center space-y-6">
                <div className="relative w-full aspect-square max-w-[300px] group transition-transform duration-700 hover:scale-110">
                   <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 animate-pulse"></div>
                   <Image 
                      src="/mascot.png" 
                      alt="The Wise Owl" 
                      width={300} 
                      height={300} 
                      className="relative z-10 drop-shadow-2xl"
                      onError={(e) => {
                         (e.target as any).src = "https://cdn-icons-png.flaticon.com/512/3069/3069172.png";
                      }}
                   />
                </div>
                <div className="bg-white p-6 rounded-[32px] shadow-2xl relative border-4 border-blue-50 text-center">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-50 rotate-45"></div>
                    <p className="text-xl font-black text-slate-800 leading-tight">
                        &quot;Show me what <br /> you learned!&quot;
                    </p>
                </div>
            </div>

            {/* Input Side */}
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start space-y-8">
                
                <div className="space-y-4 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-indigo-600 px-6 py-2 rounded-[20px] text-white font-black uppercase text-xs tracking-widest shadow-xl rotate-[-2deg]">
                        <Sparkles size={16} />
                        <span>Interactive Board</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                        Sentence <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-8">Challenge</span>
                    </h1>
                </div>

                <div className="w-full relative group">
                    <form onSubmit={handleCorrect} className="space-y-10">
                        <div className="relative">
                            <textarea
                                value={sentence}
                                onChange={(e) => setSentence(e.target.value)}
                                placeholder="Type your magic sentence here..."
                                className="w-full min-h-[220px] p-10 text-3xl text-slate-900 bg-white border-8 border-slate-50 rounded-[64px] shadow-2xl focus:outline-none focus:ring-[16px] focus:ring-indigo-100 transition-all placeholder:text-slate-200 resize-none font-black leading-tight"
                            />
                                                       {mounted && (
                              <div className="absolute -bottom-8 right-10 flex items-center space-x-8">
                                <button
                                    type="button"
                                    onClick={getHint}
                                    disabled={hintLoading || dailyWords.length === 0}
                                    className="p-5 bg-yellow-400 text-black rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all outline-none disabled:opacity-50 disabled:scale-100"
                                    title="Get a Hint!"
                                >
                                    {hintLoading ? <Loader2 className="animate-spin" /> : <Lightbulb size={32} fill="currentColor" />}
                                </button>

                                <MicButton onTranscription={(text) => setSentence(text)} disabled={loading} />
                                
                                <button
                                    type="submit"
                                    disabled={loading || !sentence.trim()}
                                    className={`inline-flex items-center px-12 py-6 rounded-[32px] font-black text-2xl shadow-2xl transition-all uppercase tracking-tight ${
                                    loading || !sentence.trim()
                                        ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-black hover:scale-110 active:scale-95 shadow-indigo-200"
                                    }`}
                                >
                                    {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-3" size={32} />
                                        Magic...
                                    </>
                                    ) : (
                                    <>
                                        Finish! 🔥
                                    </>
                                    )}
                                </button>
                              </div>
                             )}
                        </div>
                    </form>
                </div>

                {hint && (
                    <div className="w-full bg-yellow-50 border-4 border-yellow-200 p-8 rounded-[32px] animate-in slide-in-from-left duration-500 shadow-xl">
                        <div className="flex items-center space-x-4 mb-2 text-yellow-600 font-black uppercase text-sm tracking-widest">
                            <Lightbulb size={20} fill="currentColor" />
                            <span>Mascot&apos;s Hint! 💡</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-700 italic leading-relaxed">
                            &quot;Try starting with: <span className="text-indigo-600">{hint}</span>&quot;
                        </p>
                    </div>
                )}
            </div>
        </div>

        {/* Result Area */}
        {error && (
          <div className="bg-red-50 border-8 border-red-100 p-12 rounded-[64px] text-red-600 text-center animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
            <h2 className="text-4xl font-black mb-4 uppercase">Oops! 🚨</h2>
            <p className="text-xl font-bold opacity-80">{error}</p>
          </div>
        )}

        {result && <ResultCard result={result} />}

        {/* Bottom space */}
        <div className="pb-32" />
      </div>

    </div>
  );
}
