import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { getPersonajesHabilitados } from "../services/api";
import { SunIcon, MoonIcon, HelpCircleIcon } from "lucide-react";

export default function EstudianteInicio() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [tamanioFuente, setTamanioFuente] = useState(1);
  const [personajes, setPersonajes] = useState([]);
  const [ayuda, setAyuda] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  useEffect(() => {
    getPersonajesHabilitados().then(setPersonajes);
  }, []);

  return (
    <div className={`min-h-screen p-8 bg-gradient-to-br from-blue-200 to-slate-50 dark:from-slate-900 dark:to-blue-900`} style={{ fontSize: `${tamanioFuente}em` }}>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-100 mb-1">Bienvenido/a a <span className="text-primary">Conversaciones con la Historia</span></h1>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            Aquí puedes dialogar con grandes figuras del pasado, reflexionar, crecer y aprender <b>a tu propio ritmo</b>. Tu voz es importante.
          </p>
        </div>
        <div className="flex gap-3">
          <Button title="Modo oscuro/claro" onClick={() => setModoOscuro(m => !m)} variant="outline">
            {modoOscuro ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button title="Aumentar tamaño de letra" onClick={() => setTamanioFuente(f => Math.min(f + 0.1, 1.6))} variant="outline">A+</Button>
          <Button title="Disminuir tamaño de letra" onClick={() => setTamanioFuente(f => Math.max(f - 0.1, 0.8))} variant="outline">A-</Button>
          <Button title="Ayuda" onClick={() => setAyuda(a => !a)} variant="outline"><HelpCircleIcon /></Button>
        </div>
      </header>
      {ayuda && (
        <section className="bg-yellow-50 dark:bg-yellow-900 p-4 mb-6 rounded-xl text-lg shadow-lg">
          <b>¿Necesitas apoyo?</b>  
          <ul className="list-disc pl-5">
            <li>Puedes aumentar o disminuir el tamaño de la letra según te acomode.</li>
            <li>Activa el modo oscuro si te molestan los fondos claros.</li>
            <li>Siempre puedes volver atrás y pedir ayuda a tu profesor/a.</li>
            <li>Recuerda: <b>no hay respuestas malas</b>, cada idea suma.</li>
            <li>Si te sientes cansado, <b>toma una pausa</b>: tu aprendizaje es importante.</li>
          </ul>
        </section>
      )}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Elige un personaje para comenzar</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personajes.map((p, i) => (
            <div key={i} className={`rounded-2xl shadow-xl p-5 flex flex-col items-center bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-blue-900 hover:scale-105 transition-transform`}>
              <img src={p.avatarUrl} alt={`Avatar de ${p.nombre}`} className="w-24 h-24 rounded-full mb-3 border-4 border-primary" />
              <div className="text-xl font-bold mb-1">{p.nombre}</div>
              <div className="text-sm text-gray-500 mb-2">{p.epoca} &mdash; {p.coleccion}</div>
              <p className="mb-3 text-center">{p.fraseMotivante}</p>
              <Button variant="primary" to={`/estudiante/chat/${p.id}`}>Conversar</Button>
            </div>
          ))}
        </div>
        {personajes.length === 0 && <div className="mt-8 text-center text-lg text-gray-500">No hay personajes disponibles aún. ¡Pronto habrá nuevas voces para conversar!</div>}
      </section>
      <footer className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500">
        Recuerda: puedes pausar o salir en cualquier momento. Tu aprendizaje, tus reglas.
      </footer>
    </div>
  );
}
