import { NavLink } from "react-router-dom";
import { UsersIcon, BookIcon, MessageCircleIcon, StarIcon, BarChartIcon } from "lucide-react";

export default function SidebarDocente() {
  return (
    <aside className="h-full w-60 bg-gradient-to-b from-primary to-blue-400 dark:from-slate-900 dark:to-blue-800 shadow-2xl flex flex-col py-6">
      <div className="flex items-center justify-center mb-8">
        <img src="/assets/nucleo-ludico-logo.svg" alt="Logo Núcleo Lúdico" className="h-14 w-14" />
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4">
        <NavLink to="/docente" className="sidebar-link"><BarChartIcon className="inline mr-2" /> Dashboard</NavLink>
        <NavLink to="/docente/desafios" className="sidebar-link"><StarIcon className="inline mr-2" /> Desafíos</NavLink>
        <NavLink to="/docente/reflexiones" className="sidebar-link"><MessageCircleIcon className="inline mr-2" /> Reflexiones</NavLink>
        <NavLink to="/docente/personajes" className="sidebar-link"><BookIcon className="inline mr-2" /> Personajes</NavLink>
h0f1kp-codex/integrar-backend-con-frontend-para-panel-docente
        <NavLink to="/docente/mensajes-estudiantes" className="sidebar-link"><UsersIcon className="inline mr-2" /> Mensajes</NavLink>

        <NavLink to="/docente/reportes" className="sidebar-link"><UsersIcon className="inline mr-2" /> Reportes/Mensajes</NavLink>
main
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
