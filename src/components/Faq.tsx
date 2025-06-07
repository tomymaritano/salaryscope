// components/Faq.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "¿Por qué existe HackLab SalaryBoard?",
    answer: (
      <>
        Nace como parte de la familia <a
          href="https://hacklab.dog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >hacklab.dog</a>, mi ecosistema personal de herramientas abiertas y recursos tech. Veía demasiada opacidad y ruido sobre salarios, sobre todo en LATAM, y quise aportar datos reales y accesibles, en sintonía con la filosofía hacker: compartir conocimiento y abrir caminos. Todo el código y recursos son abiertos y podés ver más en mi blog o en el <a
          href="https://github.com/tomymaritano/salaryscope"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >GitHub del proyecto</a>.
      </>
    ),
  },
  {
    question: "¿Quién está detrás de HackLab SalaryBoard?",
    answer: (
      <>
        El proyecto es de <span className="font-bold text-teal-200">Tomás Maritano</span> (<a
          href="https://x.com/hacklabdog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >@hacklabdog</a>), creador de <a
          href="https://hacklab.dog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >hacklab.dog</a> y varios recursos abiertos para makers, devs y freelancers. Todo lo que hago sigue una misma línea: transparencia, comunidad y empoderar a quienes quieren crecer en tecnología.
      </>
    ),
  },
  {
    question: "¿Cómo está construida la plataforma?",
    answer: (
      <>
        La app está hecha con <span className="font-bold text-teal-200">Next.js 14</span>, <span className="font-bold text-teal-200">Tailwind CSS</span>, React y Prisma sobre PostgreSQL. El diseño es minimalista, mobile-first y con foco en experiencia de usuario. Todo corre en <a
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >Vercel</a> y es parte del ecosistema <a
          href="https://hacklab.dog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >hacklab.dog</a>. ¿Sos dev y querés chusmear o aportar? Mirá el repo en <a
          href="https://github.com/tomymaritano/salaryscope"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >GitHub</a>.
      </>
    ),
  },
  {
    question: "¿Los datos son realmente anónimos?",
    answer: (
      <>
        Siempre. No recolectamos mails ni nombres, solo los datos necesarios para generar estadísticas y comparaciones. El objetivo es que cualquiera se anime a compartir sin miedo y todos podamos tener un panorama más real del mercado. Podés leer más sobre cómo protegemos tu privacidad en nuestro <a
          href="https://hacklab.dog/blog/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >blog</a> o en el <a
          href="https://github.com/tomymaritano/salaryscope"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >README del repo</a>.
      </>
    ),
  },
  {
    question: "¿Planeás sumar nuevas funciones?",
    answer: (
      <>
        Sí. Quiero agregar <span className="font-bold text-teal-200">gráficos interactivos</span>, IA para resúmenes y análisis, exportar datos y dejar que la comunidad proponga features. Si tenés ideas, escribime por <a
          href="https://x.com/hacklabdog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >Twitter/X</a> o dejá tu sugerencia en el <a
          href="https://github.com/tomymaritano/salaryscope/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >GitHub</a>.
      </>
    ),
  },
  {
    question: "¿Cómo puedo apoyar el proyecto?",
    answer: (
      <>
        Con tu feedback, compartiendo el sitio, o invitando un <a
          href="https://cafecito.app/hacklabdog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 underline underline-offset-4 hover:text-white transition"
        >cafecito</a>. Todo va directo a mantener online la plataforma y a seguir creando cosas útiles para la comunidad. ¡Gracias!
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
        Consultá salarios, filtrá por país, rol o seniority y mirá tendencias reales del mercado.
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