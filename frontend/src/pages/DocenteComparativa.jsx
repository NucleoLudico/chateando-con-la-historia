import { useEffect, useState } from "react";
import { getComparativa } from "../services/api";

export default function DocenteComparativa() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getComparativa().then(setData);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Comparativa de participación y logros</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="h-48 flex items-end gap-6">
          {data.map((g, i) => (
            <div key={i} className="flex flex-col items-center">
              <div style={{ height: g.participacion * 2 }} className="w-8 bg-blue-400 rounded-t-xl"></div>
              <span className="mt-2 font-bold">{g.nombre}</span>
              <span className="text-xs text-gray-500">{g.participacion} participaciones</span>
            </div>
          ))}
        </div>
      </div>
      <table className="w-full border mt-6">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Grupo</th>
            <th>Participación</th>
            <th>Logros</th>
          </tr>
        </thead>
        <tbody>
          {data.flatMap(g => g.estudiantes).map((e, i) => (
            <tr key={i} className="border-t">
              <td>{e.nombre}</td>
              <td>{e.grupo}</td>
              <td>{e.participacion}</td>
              <td>{e.logros}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
