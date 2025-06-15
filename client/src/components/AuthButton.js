import React from 'react';

const AuthButton = ({ token, setToken }) => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {!token ? (
        <button
          onClick={handleLogin}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full shadow-lg transition text-sm font-medium"
        >
          Login with Spotify
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-zinc-700 hover:bg-zinc-800 text-white px-4 py-2 rounded-full shadow-lg transition text-sm font-medium"
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default AuthButton;
