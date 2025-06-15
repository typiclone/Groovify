import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-24 max-w-3xl mx-auto text-center px-4">
      <h1 className="text-4xl font-extrabold text-emerald-600 mb-4">
        Welcome to Groovify
      </h1>

      <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
        Groovify lets you and your friends collaborate on shared Spotify playlists in real-time.
        Add songs, vote on them, and create the perfect vibe together.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left text-sm text-zinc-700 dark:text-zinc-200 mb-8">
        <div>
          <h3 className="font-bold text-emerald-500 mb-1">🎧 Real-Time Collaboration</h3>
          <p>Create playlists with your group, live — no refresh needed.</p>
        </div>
        <div>
          <h3 className="font-bold text-emerald-500 mb-1">🔐 Secure Spotify Login</h3>
          <p>OAuth2 login — no passwords, no mess.</p>
        </div>
        <div>
          <h3 className="font-bold text-emerald-500 mb-1">📡 Server-Sent Events</h3>
          <p>Stay in sync with live updates powered by SSE.</p>
        </div>
        <div>
          <h3 className="font-bold text-emerald-500 mb-1">🌐 Web-Based</h3>
          <p>Works in any browser. Nothing to install.</p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition"
      >
        Login with Spotify
      </Link>

      <div className="mt-10 text-xs text-zinc-400">
        Built by Vasi using React, Node.js, Tailwind, PostgreSQL, and the Spotify API.
      </div>
    </div>
  );
};

export default Home;
