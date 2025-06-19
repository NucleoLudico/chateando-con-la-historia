const API_URL = 'http://localhost:3000/api';

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
}

function authHeaders(contentType) {
  const headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
  if (contentType) headers['Content-Type'] = contentType;
  return headers;
}

export async function getAllCharacters() {
  const res = await fetch(`${API_URL}/characters`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function saveCharacter(id, data) {
  const url = id ? `${API_URL}/characters/${id}` : `${API_URL}/characters`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: authHeaders(),
    body: data,
  });
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function deleteCharacter(id) {
  const res = await fetch(`${API_URL}/characters/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Error');
}

export async function duplicateCharacter(id) {
  const res = await fetch(`${API_URL}/characters/${id}/duplicate`, {
    method: 'POST',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function getCharacterHistory(id) {
  const res = await fetch(`${API_URL}/characters/${id}/history`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Error');
  return res.json();
}

export async function exportCharactersToExcel(characters) {
  const res = await fetch(`${API_URL}/characters/export`, {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify({ ids: characters.map(c => c.id) }),
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'personajes.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
}

export async function testCharacterChat(id, message) {
  const res = await fetch(`${API_URL}/characters/${id}/test`, {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Error');
  const data = await res.json();
  return data.reply;
}

// --- Servicios para módulo estudiante ---
export async function getPersonajesHabilitados() {
  const res = await fetch('http://localhost:3001/api/estudiante/personajes', {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener personajes habilitados');
  return res.json();
}

export async function getPersonajeDetalle(id) {
  const res = await fetch(`http://localhost:3001/api/estudiante/personajes/${id}`, {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener detalle de personaje');
  return res.json();
}

export async function enviarMensajeIA(personajeId, mensaje) {
  const res = await fetch(`http://localhost:3001/api/estudiante/chat/${personajeId}`, {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify({ mensaje })
  });
  if (!res.ok) throw new Error('Error al enviar mensaje');
  return res.json();
}

export async function getDesafiosActivos() {
  const res = await fetch('http://localhost:3001/api/estudiante/desafios', {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener desafíos');
  return res.json();
}

export async function enviarReflexion(desafioId, texto) {
  const res = await fetch(`http://localhost:3001/api/estudiante/desafios/${desafioId}/reflexion`, {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify({ texto })
  });
  if (!res.ok) throw new Error('Error al enviar reflexión');
  return res.json();
}

export async function getUltimaReflexionFeedback() {
  const res = await fetch('http://localhost:3001/api/estudiante/ultima-reflexion-feedback', {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener feedback');
  return res.json();
}

export async function enviarAutoevaluacion(auto) {
  const res = await fetch('http://localhost:3001/api/estudiante/autoevaluacion', {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify(auto)
  });
  if (!res.ok) throw new Error('Error al enviar autoevaluación');
  return res.json();
}

export async function getPortafolioEstudiante() {
  const res = await fetch('http://localhost:3001/api/estudiante/portafolio', {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener portafolio');
  return res.json();
}

export async function getResumenParaFamilia() {
  const res = await fetch('http://localhost:3001/api/estudiante/resumen-familia', {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener resumen');
  return res.json();
}

export async function enviarMensajeProfesor(mensaje) {
  const res = await fetch('http://localhost:3001/api/estudiante/mensaje-profesor', {
    method: 'POST',
    headers: authHeaders('application/json'),
    body: JSON.stringify({ mensaje })
  });
  if (!res.ok) throw new Error('Error al enviar mensaje');
  return res.json();
}

// --- Servicios simulados para el panel docente ---
export async function getResumenPanelDocente() {
  return { personajes: 7, reflexiones: 24, logros: 15 };
}

export async function getGrupos() {
  return [
    { id: 1, nombre: "7A" },
    { id: 2, nombre: "7B" },
    { id: 3, nombre: "8A" }
  ];
}

export async function getUltimosEventos() {
  return [
    { estudiante: "Camilo D.", grupo: "7A", accion: "Envío reflexión", fecha: "hace 2 h", feedbackAutomatico: "¡Excelente profundidad!" },
    { estudiante: "Mónica R.", grupo: "7A", accion: "Completó desafío", fecha: "hace 4 h", feedbackAutomatico: "¡Sigue así, buen trabajo crítico!" },
    { estudiante: "Sofía M.", grupo: "8A", accion: "Ganó insignia", fecha: "ayer", feedbackAutomatico: null }
  ];
}

export async function getDesafios() {
  return [
    { titulo: "Debate sobre Mistral", descripcion: "¿Por qué la poesía puede ser resistencia?", grupo: "7A", personajeId: "1" }
  ];
}

export async function crearDesafio(d) {
  return true;
}

export async function getReflexiones() {
  return [
    {
      id: 1,
      estudiante: "Camilo D.",
      texto: "Creo que la memoria histórica es clave para la democracia.",
      fecha: "hoy",
      desafioTitulo: "Debate sobre Mistral",
      feedbackAutomatico: "¡Gran reflexión crítica, Camilo!"
    }
  ];
}

export async function enviarFeedback(reflexionId, texto) {
  return true;
}

export async function getComparativa() {
  return [
    {
      nombre: "7A",
      participacion: 15,
      estudiantes: [
        { nombre: "Camilo D.", grupo: "7A", participacion: 7, logros: 2 },
        { nombre: "Mónica R.", grupo: "7A", participacion: 8, logros: 3 }
      ]
    },
    {
      nombre: "8A",
      participacion: 10,
      estudiantes: [
        { nombre: "Sofía M.", grupo: "8A", participacion: 5, logros: 1 },
        { nombre: "Matías S.", grupo: "8A", participacion: 5, logros: 1 }
      ]
    }
  ];
}

export async function getResumenEstudianteDocente(estudianteId) {
  const res = await fetch(
    `${API_URL}/docente/estudiante/${estudianteId}/resumen`,
    { headers: authHeaders() }
  );
  if (!res.ok) throw new Error("Error al obtener resumen de estudiante");
    return await res.json();
}

export async function getMensajesEstudiantes() {
  const res = await fetch(`${API_URL}/docente/mensajes-estudiantes`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener mensajes");
    return await res.json();
}

export async function responderMensajeEstudiante(mensajeId, texto) {
  const res = await fetch(
    `${API_URL}/docente/mensajes-estudiantes/${mensajeId}/responder`,
    {
      method: "POST",
      headers: authHeaders("application/json"),
      body: JSON.stringify({ texto }),
    }
  );
  if (!res.ok) throw new Error("Error al responder mensaje");
    return await res.json();
}
