import { useEffect, useState } from "react";
import { getMensajesEstudiantes, responderMensajeEstudiante } from "../services/api";
import { UserIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui";

export default function DocenteMensajesEstudiantes() {
  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    getMensajesEstudiantes().then(setMensajes);
  }, []);

  async function handleResponder(id) {
    if (!respuestas[id] || !respuestas[id].trim()) return;
    await responderMensajeEstudiante(id, respuestas[id]);
    setRespuestas(r => ({ ...r, [id]: "" }));
    setMensajes(await getMensajesEstudiantes());
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-900">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UserIcon /> Mensajes de estudiantes
      </h1>
      <div className="space-y-6">
        {mensajes.length === 0 && (
          <div className="text-gray-600 dark:text-gray-400">No hay mensajes pendientes.</div>
        )}
        {mensajes.map(m => (
          <div key={m.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <div className="mb-2 text-lg">
              <b>{m.estudiante}</b> | {new Date(m.fecha).toLocaleString()}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">{m.mensaje}</div>
            {m.respuestaDocente && (
              <div className="mb-2 text-green-800 dark:text-green-300 font-semibold">
                <b>Respuesta enviada:</b> {m.respuestaDocente}
              </div>
            )}
            {!m.respuestaDocente && (
              <div className="flex gap-2">
                <input
                  className="flex-1 border rounded-xl px-3 py-2"
                  placeholder="Escribe tu respuesta..."
                  value={respuestas[m.id] || ""}
                  onChange={e => setRespuestas(r => ({ ...r, [m.id]: e.target.value }))}
                />
                <Button variant="primary" onClick={() => handleResponder(m.id)}>
                  <SendIcon className="inline mr-1" /> Enviar respuesta
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
