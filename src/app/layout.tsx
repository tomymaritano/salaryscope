// app/layout.tsx
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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

export const metadata = {
  title: 'Hacklab Salary Board',
  description: 'Transparencia salarial IT sin bullshit',
};

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