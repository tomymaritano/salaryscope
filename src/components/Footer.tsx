"use client";
import {  SiLinkedin, SiGithub, SiX } from "react-icons/si";
import { FaBlog, FaHome } from "react-icons/fa";

import { FaCoffee } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { useState } from "react";

const socials = [
  {
    label: "Home",
    href: "https://hacklab.dog",
    icon: <FaHome size={22} />,
  },
  {
    label: "Blog",
    href: "https://blog.hacklab.dog",
    icon: <FaBlog size={22} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tomasmaritano/",
    icon: <SiLinkedin size={22} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/tomymaritano",
    icon: <SiGithub size={22} />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/hacklabdog",
    icon: <SiX size={22} />, // Este es el icono de X de Simple Icons
  },
];

export default function Footer() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
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
      <Image src={Logo} width={160} alt="SalaryBoard Logo" />

      {/* Socials + Tooltip arriba */}
      <nav className="relative flex items-center gap-2 md:gap-3">
        {socials.map((s) => (
          <div key={s.label} className="relative flex items-center">
            <motion.a
              href={s.href}
              title={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center rounded-none
                bg-transparent border border-teal-400/10
                text-gray-200 hover:text-teal-100
                transition-all duration-150 shadow-sm
                p-4
                focus-visible:ring-2 focus-visible:ring-teal-300
              "
              onMouseEnter={() => setHovered(s.label)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(45,255,239,0.13)",
                boxShadow: "0 2px 14px 0 rgba(20,184,166,0.07)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {s.icon}
            </motion.a>
            <AnimatePresence>
              {hovered === s.label && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -8 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="
                    absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                    px-2 py-1 rounded-lg text-xs font-mono
                    bg-black/90 text-teal-100 border border-teal-500/10 shadow
                    whitespace-nowrap pointer-events-none z-50
                  "
                >
                  {s.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
        <FaCoffee size={19} className="opacity-85" />
        <span className="hidden sm:inline">Cafecito</span>
      </motion.a>
    </motion.footer>
  );
}