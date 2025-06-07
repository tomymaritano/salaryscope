"use client";
import { FaBlog, FaGithub, FaHome, FaLinkedin, FaCoffee } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { useState } from "react";

const socials = [
  { label: "Home", href: "https://hacklab.dog", icon: <FaHome size={22} /> },
  { label: "Blog", href: "https://blog.hacklab.dog", icon: <FaBlog size={22} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tomasmaritano/", icon: <FaLinkedin size={22} /> },
  { label: "GitHub", href: "https://github.com/tomymaritano", icon: <FaGithub size={22} /> },
  { label: "X (Twitter)", href: "https://x.com/hacklabdog", icon: <BsTwitterX size={22} /> },
];

function MenuIcon({ open }: { open: boolean }) {
  // Simple hamburger/cross icon
  return (
    <div className="w-7 h-7 flex flex-col justify-center items-center">
      <span
        className={`block h-[3px] w-7 rounded-none bg-teal-200 transition-all duration-300
          ${open ? "rotate-45 translate-y-[9px]" : ""}`}
      />
      <span
        className={`block h-[3px] w-7 rounded-none bg-teal-200 transition-all duration-300 my-[5px]
          ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-[3px] w-7 rounded-none bg-teal-200 transition-all duration-300
          ${open ? "-rotate-45 -translate-y-[9px]" : ""}`}
      />
    </div>
  );
}

export default function Footer() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // BACKDROP/MENU motion variants

  return (
    <>
      {/* DESKTOP FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "tween" }}
        className={`
          w-full hidden md:flex flex-row items-center justify-around gap-3
          px-4 md:px-8 py-4
          rounded-none-none border-t border-white/15
          bg-black/40 backdrop-blur-2xl shadow-[0_4px_32px_0_rgba(20,184,166,0.07)]
          fixed bottom-0 left-0 z-50
        `}
        style={{ WebkitBackdropFilter: "blur(20px)", backdropFilter: "blur(20px)" }}
      >
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
                  inline-flex items-center justify-center rounded-none-none
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
                      px-2 py-1 rounded-none-lg text-xs font-mono
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
            rounded-none-none bg-white/10 border border-teal-400/20 shadow
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

      {/* MOBILE FOOTER */}
      <footer className={`
        w-full flex md:hidden items-center justify-between gap-2
        px-4 py-3 fixed bottom-0 left-0 z-50
        bg-black/80 backdrop-blur-lg border-t border-white/10
        shadow-[0_4px_32px_0_rgba(20,184,166,0.08)]
      `}>
        <Image src={Logo} width={200} alt="SalaryBoard Logo" />
        <button
          className="
            p-2 rounded-none-lg border border-teal-400/20 bg-black/30 
            hover:bg-teal-400/10 focus-visible:ring-2 focus-visible:ring-teal-300 transition
            flex items-center justify-center
          "
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <MenuIcon open={false} />
        </button>
      </footer>

      {/* MOBILE MENU MODAL */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setOpen(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 70 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed left-0 right-0 bottom-0 mx-auto max-w-full z-50
              bg-black/95 rounded-none-none shadow-2xl border-t border-teal-400/10 px-5 pb-8 pt-7 flex flex-col items-center"
            >
              <button
                className="absolute right-3 top-2 p-2 rounded-none hover:bg-white/10 transition"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
              >
                <MenuIcon open={true} />
              </button>
              <Image src={Logo} width={110} alt="SalaryBoard Logo" className="mb-3 mt-2" />
              <nav className="flex flex-col items-center w-full gap-1 mb-6 mt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2 w-full px-4 py-3 rounded-none-xl
                      bg-black/5 border border-teal-400/10 text-teal-100 font-medium text-lg
                      hover:bg-teal-400/20 hover:text-white/90 hover:border-teal-400/40
                      transition-all duration-150 mb-1
                    "
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </nav>
              <a
                href="https://cafecito.app/hacklabdog"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-6 py-3 mt-2
                  rounded-none-xl bg-white/10 border border-teal-400/30 shadow
                  font-semibold text-teal-200
                  backdrop-blur-md
                  hover:bg-teal-400/80 hover:text-black
                  transition-all duration-150
                  focus-visible:ring-2 focus-visible:ring-teal-300
                  text-lg
                "
              >
                <FaCoffee size={20} />
                Invitame un cafecito
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}