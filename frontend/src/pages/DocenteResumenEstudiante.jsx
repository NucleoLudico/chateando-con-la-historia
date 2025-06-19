import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumenEstudianteDocente } from "../services/api";
import { AwardIcon, BookOpenIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui";

export default function DocenteResumenEstudiante() {
  const { estudianteId } = useParams();
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    getResumenEstudianteDocente(estudianteId).then(setResumen);
  }, [estudianteId]);

  if (!resumen) return <div className="p-8 text-lg">Cargando resumen del estudiante...</div>;

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-900">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <UserIcon /> Resumen de {resumen.nombre}
        </h1>
        <div className="mb-4 text-gray-700 dark:text-gray-100">
          <b>Curso:</b> {resumen.curso}
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col items-center">
            <AwardIcon className="text-yellow-500 w-7 h-7" />
            <div className="font-bold">{resumen.insignias.length} insignias</div>
          </div>
          <div className="flex flex-col items-center">
            <BookOpenIcon className="text-blue-500 w-7 h-7" />
            <div className="font-bold">{resumen.desafiosCompletados} desafíos completados</div>
          </div>
        </div>
        <div className="mb-4 text-base text-green-800 dark:text-green-300">
          <b>Última reflexión enviada:</b><br />"{resumen.ultimaReflexion}"
        </div>
        <div className="mb-4 text-base text-blue-800 dark:text-blue-200">
          <b>Feedback docente:</b><br />{resumen.ultimoFeedback || "Aún no hay feedback enviado."}
        </div>
        <Button variant="outline" onClick={() => window.print()}>Imprimir o guardar este informe</Button>
      </div>
      <div className="mt-6 text-center text-gray-600 dark:text-gray-400 max-w-xl">
        Informe confidencial para retroalimentación y acompañamiento. Nunca para castigar ni comparar.
      </div>
    </div>
  );
}
