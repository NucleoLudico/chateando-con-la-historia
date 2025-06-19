import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Button } from "@/components/ui";
import { getReflexiones, enviarFeedback } from "../services/api";

export default function DocenteReflexiones() {
  const [reflexiones, setReflexiones] = useState([]);

  useEffect(() => {
    getReflexiones().then(setReflexiones);
  }, []);

  async function handleFeedback(id, texto) {
    await enviarFeedback(id, texto);
    setReflexiones(await getReflexiones());
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Reflexiones y feedback</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reflexiones.map((r, i) => (
          <Card key={i}>
            <CardHeader>
              <span className="font-bold">{r.estudiante}</span> <span className="text-xs text-gray-400 ml-2">{r.fecha}</span>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-gray-700">{r.texto}</div>
              <div className="text-xs text-gray-400 mb-2">Desafío: {r.desafioTitulo || "–"}</div>
              {r.feedbackAutomatico && (
                <div className="text-green-700 text-sm mb-2">
                  <b>Feedback automático:</b> {r.feedbackAutomatico}
                </div>
              )}
              <textarea className="input" placeholder="Escribe tu feedback personalizado aquí..." onBlur={e => handleFeedback(r.id, e.target.value)} />
              <style>{`.input{width:100%;padding:0.5rem;border-radius:0.5rem;border:1px solid #ccc;}`}</style>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
