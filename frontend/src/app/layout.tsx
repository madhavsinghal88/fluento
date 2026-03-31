import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Star, Trophy, Users } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fluento - fun Game for Kids!",
  description: "Learn English while playing games and winning stars!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-3xl border-b-[8px] border-slate-50">
           <nav className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-4 hover:scale-105 transition-transform group">
                 <div className="w-16 h-16 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-xl rotate-[-5deg] group-hover:rotate-0 transition-transform">
                    <Star size={32} fill="currentColor" />
                 </div>
                 <div className="flex flex-col -space-y-1">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter uppercase uppercase-bold">Fluento</span>
                    <span className="text-xs font-black text-indigo-500 uppercase tracking-widest leading-none">Learning Fun! 🍭</span>
                 </div>
              </Link>
              
              <div className="hidden md:flex items-center space-x-12">
                 <Link href="/practice" className="text-xl font-black text-slate-600 hover:text-indigo-600 transition-all uppercase tracking-tight">Play Game</Link>
                 <Link href="/prizes" className="text-xl font-black text-slate-600 hover:text-indigo-600 transition-all uppercase tracking-tight">Prizes</Link>
                 <Link href="/rankings" className="text-xl font-black text-slate-600 hover:text-indigo-600 transition-all uppercase tracking-tight">Rankings</Link>
              </div>

              <div className="flex items-center space-x-6">
                 <button className="px-8 py-3 font-black text-slate-500 hover:bg-slate-50 rounded-[20px] transition-all uppercase">Enter</button>
                 <button className="px-10 py-5 bg-[#FFCC00] text-black font-black rounded-[24px] hover:scale-110 transition-all shadow-2xl shadow-yellow-100 uppercase tracking-tight">Join Free! 🔥</button>
              </div>
           </nav>
        </header>
        <div className="pt-24">
           {children}
        </div>
      </body>
    </html>
  );
}
