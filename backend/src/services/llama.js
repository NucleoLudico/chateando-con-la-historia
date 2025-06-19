const fetch = require('node-fetch');

async function askLlama(prompt, sources = [], model = 'llama3') {
  let fullPrompt = prompt;
  if (sources && sources.length > 0) {
    fullPrompt += `\n\nFuentes para responder:\n`;
    if (Array.isArray(sources)) {
      fullPrompt += sources.map(src => `- ${typeof src === 'string' ? src : src.citation || src}`).join('\n');
    } else {
      fullPrompt += sources;
    }
  }

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt: fullPrompt, stream: false })
  });

  if (!res.ok) {
    throw new Error('Error comunicando con Llama 3');
  }
  const data = await res.json();
  return data.response?.trim() || 'Sin respuesta de la IA.';
}

module.exports = { askLlama };
