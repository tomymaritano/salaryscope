"use client";
import { Coffee, Home, Linkedin, Github, Twitter, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// Íconos y links
const socials = [
  {
    label: "Home",
    href: "https://hacklab.dog",
    icon: <Home size={20} />,
  },
  {
    label: "Blog",
    href: "https://blog.hacklab.dog",
    icon: <BookOpen size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tomasmaritano/",
    icon: <Linkedin size={20} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/tomymaritano",
    icon: <Github size={20} />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/hacklabdog",
    icon: <Twitter size={20} />,
  },
];

export default function Footer() {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "tween" }}
        className="
          w-full flex flex-col md:flex-row items-center justify-around gap-3
          px-4 md:px-8 py-4
          rounded-t-2xl border-t border-white/15
          bg-black/40 backdrop-blur-2xl shadow-[0_4px_32px_0_rgba(20,184,166,0.07)]
          fixed bottom-0 left-0 z-50
        "
        style={{
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Branding */}
        <span className="text-xs md:text-base font-bold tracking-tight text-white/80 select-none flex items-center gap-1">
           SalaryBoard
        </span>

        {/* Socials */}
        <nav className="flex items-center gap-2 md:gap-3">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              title={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center rounded-none
                bg-white/10 border border-teal-400/10
                text-gray-200 hover:text-teal-100
                transition-all duration-150 shadow-sm
                p-2
              "
              whileHover={{
                scale: 1.10,
                backgroundColor: "rgba(45,255,239,0.13)",
                boxShadow: "0 2px 14px 0 rgba(20,184,166,0.07)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </nav>

        {/* Cafecito */}
        <motion.a
          whileHover={{
            scale: 1.04,
            backgroundColor: "rgba(45,255,239,0.12)",
            color: "#16f1be",
            boxShadow: "0 1px 10px 0 rgba(20,184,166,0.08)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "tween", duration: 0.17 }}
          href="https://cafecito.app/hacklabdog"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 px-4 py-2
            rounded-none bg-white/10 border border-teal-400/20 shadow
            font-semibold text-teal-200
            backdrop-blur-md
            transition-all duration-150
            hover:text-teal-900
            focus-visible:ring-2 focus-visible:ring-teal-300
          "
        >
          <Coffee size={19} className="opacity-85" />
          <span className="hidden sm:inline">Cafecito</span>
        </motion.a>
      </motion.footer>
    </>
  );
}