import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ПингЛи Академия — математика для всех возрастов",
  description:
    "Полная образовательная платформа по математике от 4 до 18 лет и выше. Теория по ФГОС, олимпиады, высшая математика. Подготовка к ВПР, ОГЭ, ЕГЭ. Без таймеров.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Nav />
        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} ПингЛи Академия · Математика без таймеров и стресса 🐧
        </footer>
      </body>
    </html>
  );
}
