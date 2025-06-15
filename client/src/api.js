const API_BASE = 'http://localhost:5000/api';

export const getPlaylists = async () => {
  const res = await fetch(`${API_BASE}/playlist`);
  if (!res.ok) throw new Error('Failed to fetch playlists');
  return res.json();
};

export const getPlaylistTracks = async (id) => {
  const res = await fetch(`${API_BASE}/playlist/${id}`);
  if (!res.ok) throw new Error('Failed to fetch tracks');
  return res.json();
};

export const addTrack = async (track) => {
  const res = await fetch(`${API_BASE}/playlist/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(track)
  });
  if (!res.ok) throw new Error('Failed to add track');
  return res.json();
};

export const deleteTrack = async (id) => {
  const res = await fetch(`${API_BASE}/playlist/track/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete track');
  return true;
};

export const createPlaylist = async (name, userId) => {
  const res = await fetch(`${API_BASE}/playlist/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, created_by: userId })
  });
  if (!res.ok) throw new Error('Failed to create playlist');
  return res.json();
};
