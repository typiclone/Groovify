import React, { useState } from 'react';

const AddTrackForm = ({ playlistId, userId }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!title.trim() || !artist.trim()) {
      setErrorMsg('Title and artist are required.');
      return;
    }

    const trackData = {
      playlistId,
      spotify_uri: 'placeholder:uri', // Replace with real lookup if needed
      title: title.trim(),
      artist: artist.trim(),
      userId
    };

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/playlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData)
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data?.error || 'Failed to add track.');
      } else {
        setTitle('');
        setArtist('');
        setSuccess(true);
      }
    } catch (err) {
      console.error('Add track failed:', err);
      setErrorMsg('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-white">
        Add a Track
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm mb-1">
            Song Title
          </label>
          <input
            id="title"
            type="text"
            className="px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Blinding Lights"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="artist" className="text-sm mb-1">
            Artist
          </label>
          <input
            id="artist"
            type="text"
            className="px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="e.g. The Weeknd"
          />
        </div>

        {errorMsg && (
          <div className="text-red-500 text-sm">{errorMsg}</div>
        )}

        {success && (
          <div className="text-green-600 text-sm">✅ Track added!</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold ${
            loading ? 'opacity-50 cursor-wait' : 'hover:bg-emerald-600'
          }`}
        >
          {loading ? 'Adding...' : 'Add Track'}
        </button>
      </form>
    </div>
  );
};

export default AddTrackForm;
