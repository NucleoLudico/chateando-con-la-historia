import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui';
import {
  getAllCharacters,
  deleteCharacter,
  duplicateCharacter,
  exportCharactersToExcel
} from '../services/api';
import {
  PlusCircleIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  HistoryIcon,
  FileSpreadsheetIcon,
  PlayIcon
} from 'lucide-react';
import CharacterForm from '../components/CharacterForm';
import CharacterHistory from '../components/CharacterHistory';
import CharacterTestChat from '../components/CharacterTestChat';

export default function PanelCurador() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCharacter, setEditCharacter] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  const [showTest, setShowTest] = useState(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    const data = await getAllCharacters();
    setCharacters(data);
  }

  const filtered = characters.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-accent/60 to-white dark:from-blue-900 dark:to-slate-900 overflow-y-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-1">Panel Curador de Núcleo Lúdico</h1>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              “Cada personaje es una semilla para transformar el pensamiento histórico. ¡Haz crecer el bosque de la memoria!”
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowForm(true)} variant="primary" className="flex gap-2">
              <PlusCircleIcon /> Nuevo personaje
            </Button>
            <Button onClick={async () => await exportCharactersToExcel(characters)} variant="outline" className="flex gap-2">
              <FileSpreadsheetIcon /> Exportar Excel
            </Button>
          </div>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar personaje por nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full max-w-md"
          />
          <span className="text-sm text-gray-400">{filtered.length} encontrados</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left">Nombre</th>
                <th className="text-left">Colección</th>
                <th className="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="bg-white dark:bg-slate-800 shadow rounded-xl">
                  <td className="py-2 px-4 font-semibold">{p.name}</td>
                  <td className="py-2 px-4">{p.collection || 'Sin colección'}</td>
                  <td className="py-2 px-4 flex gap-2 flex-wrap">
                    <Button size="sm" variant="ghost" onClick={() => { setEditCharacter(p); setShowForm(true); }}>
                      <EditIcon className="inline" /> Editar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={async () => { await duplicateCharacter(p.id); loadCharacters(); }}>
                      <CopyIcon className="inline" /> Duplicar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowHistory(p)}>
                      <HistoryIcon className="inline" /> Historial
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowTest(p)}>
                      <PlayIcon className="inline" /> Probar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={async () => { await deleteCharacter(p.id); loadCharacters(); }}>
                      <TrashIcon className="inline" /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <CharacterForm
            character={editCharacter}
            onClose={() => { setShowForm(false); setEditCharacter(null); loadCharacters(); }}
          />
        )}

        {showHistory && (
          <CharacterHistory
            character={showHistory}
            onClose={() => setShowHistory(null)}
          />
        )}

        {showTest && (
          <CharacterTestChat
            character={showTest}
            onClose={() => setShowTest(null)}
          />
        )}
      </main>
    </div>
  );
}
