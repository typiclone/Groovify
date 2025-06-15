import React, { useState, useEffect } from 'react';
import Playlist from '../components/Playlist';
import AddTrackForm from '../components/AddTrackForm';

const Dashboard = ({ user }) => {
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistName, setPlaylistName] = useState('');
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [allPlaylists, setAllPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/playlist');
      const data = await res.json();
      setAllPlaylists(data);
      if (data.length > 0) {
        setPlaylistId(data[0].id);
        setPlaylistName(data[0].name);
      }
    } catch (err) {
      console.error('Failed to fetch playlists:', err);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/api/playlist/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, created_by: user?.id || 1 })
      });
      const data = await res.json();
      setPlaylistId(data.id);
      setPlaylistName(data.name);
      setNewName('');
      setCreating(false);
      fetchPlaylists();
    } catch (err) {
      console.error('Failed to create playlist:', err);
    }
  };

  const handleSelect = (id, name) => {
    setPlaylistId(id);
    setPlaylistName(name);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
          🎵 Groovify Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-1">
          Welcome, {user?.display_name || 'Guest'}!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Playlists</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {allPlaylists.map((pl) => (
            <button
              key={pl.id}
              className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm ${
                pl.id === playlistId
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-white'
              }`}
              onClick={() => handleSelect(pl.id, pl.name)}
            >
              {pl.name}
            </button>
          ))}
        </div>

        {creating ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Playlist Name"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full dark:bg-zinc-800 dark:text-white"
            />
            <button
              onClick={handleCreate}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Create
            </button>
            <button
              onClick={() => setCreating(false)}
              className="text-gray-500 hover:text-red-500 text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCreating(true)}
            className="text-sm text-emerald-600 font-semibold hover:underline"
          >
            + Create New Playlist
          </button>
        )}
      </div>

      {playlistId && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Now Editing: <span className="text-emerald-600">{playlistName}</span>
            </h3>
          </div>

          <AddTrackForm playlistId={playlistId} userId={user?.id || 1} />

          <Playlist playlistId={playlistId} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
