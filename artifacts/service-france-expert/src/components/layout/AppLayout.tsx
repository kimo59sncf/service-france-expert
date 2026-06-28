import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AlertCircle } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-accent selection:text-white">
      {/* Bandeau légal obligatoire */}
      <div className="bg-[#1a2744] border-b border-white/10 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs text-white/90 leading-snug">
            <span className="font-semibold text-white">Service France Expert est une société privée, indépendante des préfectures et de toute administration publique.</span>
            {" "}Nos prestations sont payantes et ne remplacent pas les démarches gratuites accessibles directement auprès des services de l'État.
          </p>
        </div>
      </div>
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
