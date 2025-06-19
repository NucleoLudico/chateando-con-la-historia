import { useEffect, useState } from 'react';
import { getCharacterHistory } from '../services/api';
import { Button } from '@/components/ui';

export default function CharacterHistory({ character, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getCharacterHistory(character.id).then(setHistory);
  }, [character.id]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Historial de cambios: {character.name}</h2>
        <ul className="space-y-2 max-h-96 overflow-auto">
          {history.map((item, i) => (
            <li key={i} className="border-b pb-2">
              <div><b>Acción:</b> {item.action}</div>
              {item.field && <div><b>Campo:</b> {item.field}</div>}
              {item.oldValue && <div><b>Antes:</b> {item.oldValue}</div>}
              {item.newValue && <div><b>Después:</b> {item.newValue}</div>}
              <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
        <Button className="mt-4 w-full" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}
