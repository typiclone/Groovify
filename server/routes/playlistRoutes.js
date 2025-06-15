const express = require('express');
const router = express.Router();
const {
  getPlaylists,
  getPlaylistTracks,
  addTrack,
  createPlaylist,
  deleteTrack,
} = require('../controllers/playlistController');


router.get('/', getPlaylists);


router.get('/:id', getPlaylistTracks);


router.post('/add', addTrack);

router.post('/create', createPlaylist);


router.delete('/track/:id', deleteTrack);

module.exports = router;
