import Sidebar from "../components/Sidebar";
import { PlusCircleIcon } from "lucide-react";
import { Button, Card, CardHeader, CardContent } from "@/components/ui";

export default function PanelCurador() {
  // Datos mock para personajes y colecciones (luego vendrá integración backend)
  const personajes = [
    { id: 1, name: "Gabriela Mistral", collection: "Poetas Latinoamericanos" },
    { id: 2, name: "Salvador Allende", collection: "Pensamiento Político" },
  ];
  const colecciones = [
    "Poetas Latinoamericanos",
    "Pensamiento Político",
    "Científicos Humanistas",
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-accent/60 to-white dark:from-blue-900 dark:to-slate-900 overflow-y-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-2">
            Bienvenido/a, Curador/a de Núcleo Lúdico
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            <strong>
              “Tienes el poder de transformar la memoria histórica con cada personaje que curas y cada fuente que validas.”
            </strong>
            <br />
            ¡Crea, edita y enriquece colecciones! Tu trabajo es fundamental para docentes y estudiantes.
          </p>
        </section>
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Personajes recientes</h2>
            <Button variant="outline" className="flex gap-2">
              <PlusCircleIcon /> Nuevo personaje
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {personajes.map((p) => (
              <Card key={p.id} className="rounded-2xl shadow-lg hover:scale-105 transition-transform">
                <CardHeader>
                  <span className="text-lg font-bold">{p.name}</span>
                  <span className="block text-sm text-gray-500">{p.collection}</span>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-primary">Editar</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Colecciones</h2>
          <div className="flex gap-3 flex-wrap">
            {colecciones.map((col) => (
              <span
                key={col}
                className="bg-primary/80 text-white px-4 py-2 rounded-xl shadow text-sm font-medium"
              >
                {col}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
