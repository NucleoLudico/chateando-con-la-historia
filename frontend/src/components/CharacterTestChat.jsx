import { useState } from 'react';
import { Button } from '@/components/ui';
import { testCharacterChat } from '../services/api';

export default function CharacterTestChat({ character, onClose }) {
  const [messages, setMessages] = useState([
    { text: '¡Hola! Puedes probar el personaje con preguntas reales.', user: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, user: 'you' }];
    setMessages(newMessages);
    setLoading(true);
    const reply = await testCharacterChat(character.id, input);
    setMessages([...newMessages, { text: reply, user: 'ia' }]);
    setLoading(false);
    setInput('');
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-2">Probar personaje: {character.name}</h2>
        <div className="h-72 overflow-y-auto bg-gray-50 rounded-lg p-3 mb-3">
          {messages.map((msg, i) => (
            <div key={i} className={`my-1 ${msg.user === 'you' ? 'text-right' : 'text-left'}`}> 
              <span className={`inline-block px-3 py-1 rounded-xl ${msg.user === 'you' ? 'bg-primary text-white' : msg.user === 'ia' ? 'bg-green-100' : 'bg-gray-200'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input className="flex-1 border rounded-lg px-2 py-1" value={input} onChange={e => setInput(e.target.value)} disabled={loading} />
          <Button type="submit" disabled={loading}>Enviar</Button>
        </form>
        <Button variant="outline" className="mt-3 w-full" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}
