import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-emerald-600 tracking-tight">
          Groovify
        </Link>

        <nav className="space-x-4 text-sm">
          <a
            href="https://github.com/yourusername/groovify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://developer.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            Spotify Dev
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
