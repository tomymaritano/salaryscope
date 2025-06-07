// components/Faq.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Por qué existe SalaryBoard?",
    answer: (
      <>
        Porque la data salarial en tech debería ser **libre** y sin humo. Este proyecto nace desde <a
          href="https://hacklab.dog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >hacklab.dog</a> para que cualquier persona, dev o no, pueda comparar salarios reales de forma **anónima**. Nada de gatekeeping ni formularios eternos.  
        <br />
        <span className="text-xs text-gray-400 block mt-1">La info es tuya, no de las empresas.</span>
      </>
    ),
  },
  {
    question: "¿Quién lo hizo? ¿Quién mantiene esto?",
    answer: (
      <>
        <span className="font-bold text-teal-200">Tomás Maritano</span> (<a
          href="https://x.com/hacklabdog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >@hacklabdog</a>).  
        <br />  
        Maker, builder, anti-bullshit. El código y los datos son **abiertos** en el <a
          href="https://github.com/tomymaritano/salaryscope"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >GitHub del proyecto</a>.
      </>
    ),
  },
  {
    question: "¿Cómo está construido?",
    answer: (
      <>
        Con <span className="font-bold text-teal-200">Next.js 14</span>, <span className="font-bold text-teal-200">React</span>, <span className="font-bold text-teal-200">Tailwind CSS</span> y <span className="font-bold text-teal-200">Prisma/PostgreSQL</span>.  
        El diseño: **minimalista, mobile-first y con glassmorphism** porque nos gusta lo simple y moderno.  
        <br />
        <span className="text-xs text-gray-400">Deploy directo en Vercel. Repo abierto para que chusmees o hackees.</span>
      </>
    ),
  },
  {
    question: "¿Los datos son anónimos de verdad?",
    answer: (
      <>
        **Siempre.**  
        No se pide mail, ni nombre, ni nada identificable. Solo el dato necesario para comparar. Si querés ver cómo funciona, todo está en el repo (<a
          href="https://github.com/tomymaritano/salaryscope"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >README</a>).  
        <br />
        <span className="text-xs text-gray-400">Privacidad nivel paranoia.</span>
      </>
    ),
  },
  {
    question: "¿Qué se viene? ¿Puedo proponer features?",
    answer: (
      <>
        Sí.  
        Se vienen **más gráficos, IA para resúmenes automáticos, y export de datos**.  
        Si sos dev y querés sumar ideas, hacé un PR o abrí un issue en <a
          href="https://github.com/tomymaritano/salaryscope/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >GitHub</a>.
        <br />
        <span className="text-xs text-gray-400">La comunidad propone, el código responde.</span>
      </>
    ),
  },
  {
    question: "¿Cómo puedo bancar el proyecto?",
    answer: (
      <>
        Con feedback, compartiendo el sitio o con un <a
          href="https://cafecito.app/hacklabdog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >cafecito</a> ☕️.  
        Todo suma para mantener la plataforma **abierta y online**.
      </>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mb-20">
      <h2 className="text-2xl font-black text-gray-200 mb-3 mt-16 text-left">Preguntas frecuentes</h2>
      <p className="text-base text-gray-500 mb-8 text-left">
        Respuestas cortas y sin vueltas. Preguntá más en X o en el repo si algo no está acá.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.question}
            className="rounded-none bg-black/90 border border-white/10 shadow-lg overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-white text-lg transition group"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-6 h-6 ml-2 transition-transform ${
                  open === idx ? "rotate-180 text-teal-300" : "rotate-0 text-white"
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 px-6 ${
                open === idx ? "max-h-40 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
              }`}
              style={{ overflow: "hidden" }}
            >
              <p className="text-gray-200 text-base">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}