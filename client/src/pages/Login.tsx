import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'ACCESS DENIED');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col crt-screen bg-arcade-black">
      {/* Header */}
      <header className="border-b-4 border-arcade-green bg-arcade-darker p-4 pixel-border">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-arcade-green arcade-title">
            [RETROTASK]
          </Link>
          <div className="flex items-center space-x-4">
            <div className="status-led active"></div>
            <Link to="/signup" className="arcade-button text-xs">
              SIGN UP
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center crt-gradient">
        <div className="w-full max-w-md">
          <div className="pixel-card">
            <h2 className="text-2xl font-bold mb-6 text-center text-arcade-green arcade-title">
              [PLAYER LOGIN]
            </h2>

            {error && (
              <div className="mb-4 p-3 border-4 border-arcade-red text-arcade-red text-center pixel-border animate-blink">
                <span className="arcade-subtitle">ACCESS DENIED:</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 text-arcade-green terminal-text">
                  EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pixel-input w-full"
                  placeholder="PLAYER@EMAIL.COM"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold mb-2 text-arcade-green terminal-text">
                  PASSWORD:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pixel-input w-full"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="arcade-button w-full disabled:opacity-50 text-sm"
              >
                {isLoading ? 'CONNECTING...' : '▶ ACCESS GAME'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-arcade-gray font-terminal">
                New player?{' '}
                <Link to="/signup" className="text-arcade-green hover:text-arcade-amber transition-colors">
                  [CREATE PROFILE]
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Warning */}
          <div className="pixel-card border-arcade-red text-center mt-6 animate-pulse-slow">
            <div className="text-arcade-red font-bold mb-2 arcade-subtitle">⚠ DEMO CARTRIDGE ⚠</div>
            <p className="text-arcade-gray font-terminal text-sm">
              Do not enter real personal information. This is for demonstration purposes only.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-arcade-green bg-arcade-darker p-4 text-arcade-green pixel-border">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4">
            <div className="status-led active"></div>
            <p className="terminal-text text-xs">
              [RETROTASK] © 2026 | 8-BIT ARCADE EDITION
            </p>
            <div className="status-led active"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
