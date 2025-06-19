import { useState } from 'react';
import { Button } from '@/components/ui';
import { saveCharacter } from '../services/api';

export default function CharacterForm({ character, onClose }) {
  const [name, setName] = useState(character?.name || '');
  const [collection, setCollection] = useState(character?.collection || '');
  const [promptAlma, setPromptAlma] = useState(character?.promptAlma || '');
  const [biography, setBiography] = useState(character?.biography || '');
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [sources, setSources] = useState(character?.sources || []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('collection', collection);
    data.append('promptAlma', promptAlma);
    data.append('biography', biography);
    data.append('sources', JSON.stringify(sources));
    if (pdf) data.append('pdf', pdf);
    if (image) data.append('image', image);
    await saveCharacter(character?.id, data);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold mb-2">{character ? 'Editar' : 'Nuevo'} personaje</h2>
        <input className="input" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
        <input className="input" placeholder="Colección" value={collection} onChange={e => setCollection(e.target.value)} />
        <textarea className="input" placeholder="Prompt alma" value={promptAlma} onChange={e => setPromptAlma(e.target.value)} required />
        <textarea className="input" placeholder="Biografía" value={biography} onChange={e => setBiography(e.target.value)} required />
        <input type="file" accept="application/pdf" onChange={e => setPdf(e.target.files[0])} />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary">{character ? 'Guardar' : 'Crear'}</Button>
        </div>
      </form>
      <style>{`.input{width:100%;padding:0.75rem;margin-bottom:0.5rem;border-radius:0.75rem;border:1px solid #ccc;}`}</style>
    </div>
  );
}
