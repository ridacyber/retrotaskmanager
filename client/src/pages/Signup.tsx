import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
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
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b-4 border-snes-purple shadow-snes">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-snes-purple snes-title">
              RETROTASK
            </Link>
            <div className="flex items-center space-x-4">
              <div className="status-indicator active"></div>
              <Link to="/login" className="snes-button text-xs">
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="snes-card">
              <h2 className="text-2xl font-bold mb-6 text-center text-snes-purple snes-title">
                🌟 SIGN UP 🌟
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border-4 border-red-400 text-red-700 text-center rounded-lg">
                  <span className="font-bold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-bold mb-2 text-snes-purple snes-text">
                    🎮 Your Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="snes-input w-full"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-bold mb-2 text-snes-purple snes-text">
                    📧 Email Address:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="snes-input w-full"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-lg font-bold mb-2 text-snes-purple snes-text">
                    🔐 Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="snes-input w-full"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="snes-button w-full disabled:opacity-50 text-lg"
                >
                  {isLoading ? '🎯 Creating...' : '🎮 CREATE ACCOUNT'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-snes-darkPurple snes-text">
                  Already have an account?{' '}
                  <Link to="/login" className="text-snes-purple hover:text-snes-pink transition-colors font-bold">
                    LOGIN HERE
                  </Link>
                </p>
              </div>
            </div>

            {/* Demo Warning */}
            <div className="disclaimer-box mt-6">
              ⚠ DEMO APPLICATION ⚠<br/>
              DO NOT ENTER REAL PERSONAL INFORMATION<br/>
              THIS IS FOR DEMONSTRATION PURPOSES ONLY
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-snes-purple border-t-4 border-snes-yellow p-6 text-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <div className="status-indicator active"></div>
            <p className="snes-text text-sm">
              RETROTASK © 2026 | Colorful & Fun
            </p>
            <div className="status-indicator active"></div>
          </div>
          <p className="snes-text text-xs text-snes-yellow">
            Built with React, Node.js, and Lots of Color! 🌈
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
