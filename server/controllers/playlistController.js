const db = require('../db');
const { broadcastUpdate } = require('../sse/sseManager');


exports.getPlaylists = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM playlists ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

exports.getPlaylistTracks = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT t.*, u.display_name AS added_by_name
       FROM tracks t
       LEFT JOIN users u ON t.added_by = u.id
       WHERE t.playlist_id = $1
       ORDER BY t.added_at ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tracks:', err);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
};

// Add a track to a playlist
exports.addTrack = async (req, res) => {
  const { playlistId, spotify_uri, title, artist, userId } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO tracks (playlist_id, spotify_uri, title, artist, added_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [playlistId, spotify_uri, title, artist, userId]
    );

    broadcastUpdate({ type: 'NEW_TRACK', data: result.rows[0] });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding track:', err);
    res.status(500).json({ error: 'Failed to add track' });
  }
};


exports.createPlaylist = async (req, res) => {
  const { name, created_by } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO playlists (name, created_by)
       VALUES ($1, $2)
       RETURNING *`,
      [name, created_by]
    );

    broadcastUpdate({ type: 'NEW_PLAYLIST', data: result.rows[0] });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating playlist:', err);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};


exports.deleteTrack = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM tracks WHERE id = $1', [id]);
    broadcastUpdate({ type: 'DELETE_TRACK', data: { id: parseInt(id) } });
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting track:', err);
    res.status(500).json({ error: 'Failed to delete track' });
  }
};
