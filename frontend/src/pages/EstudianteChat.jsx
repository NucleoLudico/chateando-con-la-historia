import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { getPersonajeDetalle, enviarMensajeIA } from "../services/api";
import { Volume2Icon, StarIcon, BookOpenIcon, SmileIcon, ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
export default function EstudianteChat() {
  const { personajeId } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [insignias, setInsignias] = useState([]);
  const [fuentesVisibles, setFuentesVisibles] = useState(false);
  const mensajesRef = useRef(null);

  useEffect(() => {
    getPersonajeDetalle(personajeId).then(data => {
      setPersonaje(data);
      setMensajes([
        {
          de: "ia",
          texto: `Hola, soy ${data.nombre}. ¿Sobre qué te gustaría conversar hoy?`,
          fuentes: [],
          emociones: []
        }
      ]);
    });
  }, [personajeId]);

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  async function handleEnviar(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setEnviando(true);
    const tuMensaje = { de: "tu", texto: input, fuentes: [], emociones: [] };
    setMensajes(ms => [...ms, tuMensaje]);
    setInput("");
    const res = await enviarMensajeIA(personajeId, input);
    const iaMensaje = {
      de: "ia",
      texto: res.texto,
      fuentes: res.fuentes || [],
      emociones: res.emociones || []
    };
    setMensajes(ms => [...ms, iaMensaje]);
    if (res.insignia) setInsignias(ins => [...ins, res.insignia]);
    setEnviando(false);
  }

  function leerMensaje(texto) {
    const u = new window.SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    window.speechSynthesis.speak(u);
  }

  function refrescarConversacion() {
    setMensajes([
      {
        de: "ia",
        texto: `Hola, soy ${personaje.nombre}. ¿Sobre qué te gustaría conversar hoy?`,
        fuentes: [],
        emociones: []
      }
    ]);
    setInsignias([]);
  }

  if (!personaje) return <div className="p-8 text-lg">Cargando personaje...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-900 p-6 flex flex-col">
      <header className="flex items-center gap-3 mb-4">
        <Button variant="outline" onClick={() => navigate('/estudiante')}><ArrowLeftIcon /> Volver</Button>
        <img src={personaje.avatarUrl} alt={personaje.nombre} className="w-14 h-14 rounded-full border-2 border-primary" />
        <div>
          <div className="text-xl font-bold">{personaje.nombre}</div>
          <div className="text-sm text-gray-500">{personaje.epoca} — {personaje.coleccion}</div>
        </div>
        <div className="flex-1" />
        <Button variant="outline" onClick={refrescarConversacion} title="Reiniciar conversación">
          <RefreshCwIcon />
        </Button>
      </header>
      <section
        ref={mensajesRef}
        className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 overflow-y-auto mb-4"
        style={{ minHeight: 320, maxHeight: 480 }}
        tabIndex={0}
        aria-label="Zona de conversación"
      >
        {mensajes.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.de === "tu" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow text-base ${m.de === "tu"
              ? "bg-primary text-white self-end"
              : "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 self-start"}`}>
              <span>{m.texto}</span>
              {m.de === "ia" && (
                <div className="mt-2 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => leerMensaje(m.texto)} title="Leer en voz alta">
                    <Volume2Icon />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setFuentesVisibles(v => !v)} title="Ver fuentes">
                    <BookOpenIcon />
                  </Button>
                  {m.emociones && m.emociones.length > 0 && (
                    <span title="Emociones del mensaje" className="ml-1"><SmileIcon /> {m.emociones.join(", ")}</span>
                  )}
                </div>
              )}
              {fuentesVisibles && m.fuentes && m.fuentes.length > 0 && (
                <div className="mt-1 text-xs text-blue-800 dark:text-blue-200">
                  <b>Fuentes usadas:</b>
                  <ul className="list-disc ml-4">
                    {m.fuentes.map((f, fi) => <li key={fi}>{f}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
      <form onSubmit={handleEnviar} className="flex gap-2 mb-3">
        <input
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-primary"
          type="text"
          value={input}
          disabled={enviando}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu mensaje aquí…"
          aria-label="Escribe tu mensaje"
        />
        <Button type="submit" disabled={enviando || !input.trim()} variant="primary">Enviar</Button>
      </form>
      <div className="flex items-center gap-4">
        {insignias.map((ins, i) => (
          <div key={i} className="flex items-center gap-1 bg-yellow-200 dark:bg-yellow-600 px-3 py-1 rounded-xl">
            <StarIcon className="text-yellow-700" /> <span className="font-bold">{ins}</span>
          </div>
        ))}
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Recuerda: Puedes pedir que te lean las respuestas, ver fuentes y pausar la conversación cuando lo necesites. Tu voz es valiosa y respetada.
      </footer>
    </div>
  );
}
