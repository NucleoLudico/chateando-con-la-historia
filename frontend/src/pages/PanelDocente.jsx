import SidebarDocente from "../components/SidebarDocente";
import { Card, CardContent, CardHeader, Button } from "@/components/ui";
import { useEffect, useState } from "react";
import { getResumenPanelDocente, getGrupos, getUltimosEventos } from "../services/api";
import { LineChart, BarChart, UsersIcon, BookIcon, MessageCircleIcon, AwardIcon } from "lucide-react";

export default function PanelDocente() {
  const [resumen, setResumen] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [ultimosEventos, setUltimosEventos] = useState([]);

  useEffect(() => {
    getResumenPanelDocente().then(setResumen);
    getGrupos().then(setGrupos);
    getUltimosEventos().then(setUltimosEventos);
  }, []);

  return (
    <div className="flex h-screen">
      <SidebarDocente />
      <main className="flex-1 p-8 bg-gradient-to-br from-accent/60 to-white dark:from-blue-900 dark:to-slate-900 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-primary mb-4">Panel Docente</h1>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-200">
          Bienvenido/a, <b>educador/a crítico/a</b>. Aquí puedes monitorear el aprendizaje, crear desafíos, dar retroalimentación motivante y potenciar la memoria histórica de tus estudiantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <UsersIcon className="text-blue-500" /> Grupos
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{grupos.length}</span>
              <div className="text-sm text-gray-500">grupos activos</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BookIcon className="text-green-500" /> Personajes
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{resumen?.personajes || "–"}</span>
              <div className="text-sm text-gray-500">habilitados</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MessageCircleIcon className="text-yellow-500" /> Reflexiones
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{resumen?.reflexiones || "–"}</span>
              <div className="text-sm text-gray-500">recibidas</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <AwardIcon className="text-indigo-500" /> Logros
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{resumen?.logros || "–"}</span>
              <div className="text-sm text-gray-500">insignias entregadas</div>
            </CardContent>
          </Card>
        </div>
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Comparativa entre grupos</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="h-48 flex items-center justify-center text-gray-400">
              <BarChart className="w-20 h-20" />
              <span className="ml-3">[Gráfico: participación por grupo]</span>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Progreso temporal (línea de tiempo)</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="h-48 flex items-center justify-center text-gray-400">
              <LineChart className="w-20 h-20" />
              <span className="ml-3">[Gráfico: evolución participación/ánimo]</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Eventos recientes y feedback</h2>
          <ul className="divide-y divide-gray-200">
            {ultimosEventos.map((ev, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <span>
                  <b>{ev.estudiante}</b> en <b>{ev.grupo}</b>: {ev.accion}
                  <span className="ml-2 text-xs text-gray-500">{ev.fecha}</span>
                </span>
                {ev.feedbackAutomatico && (
                  <span className="ml-2 text-green-600 text-sm font-semibold">
                    {ev.feedbackAutomatico}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10 flex gap-3">
          <Button variant="primary" to="/docente/desafios">Crear desafío</Button>
          <Button variant="outline" to="/docente/reflexiones">Revisar reflexiones</Button>
          <Button variant="outline" to="/docente/personajes">Gestionar personajes</Button>
          <Button variant="outline" to="/docente/reportes">Reportes y mensajes</Button>
        </section>
      </main>
    </div>
  );
}
