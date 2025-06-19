import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Button } from "@/components/ui";
import { PlusCircleIcon } from "lucide-react";
import { getDesafios, crearDesafio } from "../services/api";

export default function DocenteDesafios() {
  const [desafios, setDesafios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nuevo, setNuevo] = useState({ titulo: "", descripcion: "", grupo: "", personajeId: "" });

  useEffect(() => {
    getDesafios().then(setDesafios);
  }, []);

  async function handleCrear(e) {
    e.preventDefault();
    await crearDesafio(nuevo);
    setShowForm(false);
    setNuevo({ titulo: "", descripcion: "", grupo: "", personajeId: "" });
    setDesafios(await getDesafios());
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Desafíos</h1>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <PlusCircleIcon className="inline mr-1" /> Nuevo desafío
        </Button>
      </div>
      {showForm && (
        <form className="bg-white rounded-xl shadow-lg p-6 mb-8" onSubmit={handleCrear}>
          <h2 className="text-lg font-semibold mb-3">Crear nuevo desafío</h2>
          <input className="input" placeholder="Título" value={nuevo.titulo} onChange={e => setNuevo({ ...nuevo, titulo: e.target.value })} required />
          <textarea className="input" placeholder="Descripción" value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} required />
          <input className="input" placeholder="Grupo" value={nuevo.grupo} onChange={e => setNuevo({ ...nuevo, grupo: e.target.value })} />
          <input className="input" placeholder="ID Personaje" value={nuevo.personajeId} onChange={e => setNuevo({ ...nuevo, personajeId: e.target.value })} />
          <div className="flex gap-3 mt-3">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button type="submit" variant="primary">Crear</Button>
          </div>
          <style>{`.input{width:100%;padding:0.75rem;margin-bottom:0.5rem;border-radius:0.75rem;border:1px solid #ccc;}`}</style>
        </form>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {desafios.map((d, i) => (
          <Card key={i}>
            <CardHeader>
              <span className="font-bold">{d.titulo}</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-2">{d.descripcion}</div>
              <div className="text-xs text-gray-400">Grupo: {d.grupo || "–"} | Personaje: {d.personajeId || "–"}</div>
              <Button variant="outline" className="mt-2">Ver entregas</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
