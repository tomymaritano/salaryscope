// components/Footer.tsx
"use client";
import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/60 backdrop-blur-xl py-5 px-4 flex items-center justify-between gap-4">
      {/* Left: Brand */}
      <span className="text-sm md:text-base font-bold tracking-tight text-white/80 select-none">
        HackLab SalaryBoard <span className="text-teal-400/80 font-mono">· {new Date().getFullYear()}</span>
      </span>

      {/* Right: Cafecito link */}
      <a
        href="https://cafecito.app/hacklabdog"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-teal-200 border border-teal-400/20 bg-white/5 hover:bg-teal-400/90 hover:text-black transition-all shadow backdrop-blur"
      >
        <Coffee size={18} className="mr-1" />
        Invitame un cafecito
      </a>
    </footer>
  );
}