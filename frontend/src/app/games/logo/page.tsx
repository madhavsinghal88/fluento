import LogoGame from "@/components/LogoGame";

export default function LogoGamePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative gradient background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-200 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-100 blur-[100px] rounded-full opacity-50"></div>
      </div>
      
      <main className="container mx-auto px-6 py-20 relative z-10">
        <LogoGame />
      </main>
    </div>
  );
}
