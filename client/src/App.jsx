import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Header from './components/Header';
import AuthButton from './components/AuthButton';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (err) {
        console.error('Error verifying token', err);
        localStorage.removeItem('token');
        setToken(null);
      }
      setLoading(false);
    };

    checkUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white flex flex-col">
        <Header />
        <main className="flex-grow pt-20 px-6">
          {loading ? (
            <div className="text-center text-lg mt-10 text-zinc-400">Checking session...</div>
          ) : (
            <Routes>
              {!token ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          )}
        </main>

        <footer className="text-center text-sm text-zinc-500 py-6">
          Groovify – Built with ❤️ using Spotify & SSE
        </footer>

        <AuthButton token={token} setToken={setToken} />
      </div>
    </Router>
  );
};

export default App;
