export default function Navbar() {
  return (
    <nav className="bg-white/90 dark:bg-slate-900/80 shadow-md px-6 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/icon.png" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg tracking-widest text-blue-700 dark:text-blue-300">Conversaciones con la Historia</span>
      </div>
    </nav>
  );
}
