const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const { initSSE } = require('./sse/sseManager');

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/playlist', playlistRoutes);


app.get('/api/stream', initSSE);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Groovify server running on http://localhost:${PORT}`);
});
