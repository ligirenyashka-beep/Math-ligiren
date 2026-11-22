"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Главная", icon: "🏠" },
  { href: "/grades", label: "Курс 1–11", icon: "🗺️" },
  { href: "/learn", label: "Обучение", icon: "📚" },
  { href: "/theory", label: "Теория", icon: "📖" },
  { href: "/practice", label: "Практика", icon: "✏️" },
  { href: "/exams", label: "Экзамены", icon: "🎯" },
  { href: "/intensives", label: "Интенсивы", icon: "⚡" },
  { href: "/characters", label: "Персонажи", icon: "🐧" },
  { href: "/cabinet", label: "Кабинет", icon: "⭐" },
  { href: "/apply", label: "Заявка", icon: "📝" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-sm">
            🐧
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-800">
            ПингЛи<span className="text-indigo-600"> Академия</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-2.5 py-2 text-sm font-semibold transition ${
                isActive(l.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="mr-1">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Меню"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-2 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                isActive(l.href) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="mr-2">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
