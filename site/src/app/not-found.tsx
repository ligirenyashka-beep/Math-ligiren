import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-7xl">🐧</div>
      <h1 className="mt-4 text-3xl font-extrabold text-slate-800">Страница не найдена</h1>
      <p className="mt-2 text-slate-500">Возможно, эта тема ещё в разработке или ссылка устарела.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-indigo-700"
      >
        На главную
      </Link>
    </div>
  );
}
