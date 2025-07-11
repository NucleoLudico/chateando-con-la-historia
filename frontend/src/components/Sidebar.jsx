import { BookIcon, UsersIcon, SettingsIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-gradient-to-b from-primary to-blue-400 dark:from-slate-900 dark:to-blue-800 shadow-2xl flex flex-col py-6">
      <div className="flex items-center justify-center mb-8">
        <img src="/assets/nucleo-ludico-logo.svg" alt="Logo Núcleo Lúdico" className="h-16 w-16" />
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4">
        <NavLink to="/curador" className="sidebar-link">
          <BookIcon className="inline mr-2" /> Personajes
        </NavLink>
        <NavLink to="/curador/colecciones" className="sidebar-link">
          <UsersIcon className="inline mr-2" /> Colecciones
        </NavLink>
        <NavLink to="/curador/ajustes" className="sidebar-link mt-auto">
          <SettingsIcon className="inline mr-2" /> Ajustes
        </NavLink>
      </nav>
      <style>{`
        .sidebar-link {
          display: flex; align-items: center; padding: 0.75rem 1rem; border-radius: 1rem;
          font-weight: 500; color: #fff; transition: background 0.2s;
        }
        .sidebar-link.active, .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </aside>
  );
}
