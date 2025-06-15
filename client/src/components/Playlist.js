import React, { useEffect, useState } from 'react';

const Playlist = ({ playlistId }) => {
  const [tracks, setTracks] = useState([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playlistId) return;

    const fetchTracks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/playlist/${playlistId}`);
        const data = await res.json();
        setTracks(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load tracks:', err);
        setLoading(false);
      }
    };

    fetchTracks();

    const evtSource = new EventSource('http://localhost:5000/api/stream');
    setConnected(true);

    evtSource.onmessage = (e) => {
      const parsed = JSON.parse(e.data);
      if (parsed.type === 'NEW_TRACK' && parsed.data.playlist_id === parseInt(playlistId)) {
        setTracks((prev) => [...prev, parsed.data]);
      } else if (parsed.type === 'DELETE_TRACK') {
        setTracks((prev) => prev.filter((t) => t.id !== parsed.data.id));
      }
    };

    evtSource.onerror = (e) => {
      console.warn('SSE connection lost:', e);
      setConnected(false);
      evtSource.close();
    };

    return () => {
      evtSource.close();
    };
  }, [playlistId]);

  const deleteTrack = async (trackId) => {
    try {
      await fetch(`http://localhost:5000/api/playlist/track/${trackId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete track:', err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-3">Tracks</h3>

      {loading ? (
        <div className="text-sm text-zinc-500">Loading playlist...</div>
      ) : tracks.length === 0 ? (
        <div className="text-sm text-zinc-500 italic">This playlist is empty.</div>
      ) : (
        <ul className="space-y-3">
          {tracks.map((track) => (
            <li
              key={track.id}
              className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-zinc-500">{track.artist}</p>
                <p className="text-xs text-zinc-400">
                  added by {track.added_by_name || 'Anonymous'}
                </p>
              </div>
              <button
                onClick={() => deleteTrack(track.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="text-xs text-zinc-400 mt-4">
        SSE Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
    </div>
  );
};

export default Playlist;
