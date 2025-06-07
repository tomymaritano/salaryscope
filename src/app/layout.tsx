// app/layout.tsx
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";


export const metadata = {
  title: 'SalaryBoard - Free Data',
  description: 'Transparencia salarial IT. Sin humo. Sin drama. Consulta y compartí salarios tech de LATAM y Europa de forma 100% anónima.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'HackLab SalaryBoard',
    description: 'Transparencia salarial IT. Sin humo. Sin drama.',
    url: 'https://salary.hacklab.dog',
    siteName: 'SalaryBoard - hacklab.dpg',
    images: [
      {
        url: '/og-image.png', // (Coloca tu imagen OG en /public)
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
};

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});
const ibmMono = IBM_Plex_Mono({
  variable: '--font-ibm-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'], // or include other weights as needed
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${ibmMono.variable} antialiased`}>
        <main className="min-h-screen bg-black/90 text-white font-sans">{children}</main>
        <Footer />
      </body>
    </html>
  );
}