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
