import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b-4 border-snes-purple shadow-snes">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-snes-purple snes-title">
              RETROTASK
            </h1>
            <div className="flex items-center space-x-4">
              <div className="status-indicator active"></div>
              <span className="text-snes-purple font-terminal text-lg">READY!</span>
              <div className="space-x-2">
                <Link to="/login" className="snes-button text-xs">
                  LOGIN
                </Link>
                <Link to="/signup" className="snes-button text-xs">
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Disclaimer - Moved to top */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="disclaimer-box">
              ⚠ DEMO APPLICATION ⚠<br/>
              DO NOT ENTER REAL PERSONAL INFORMATION<br/>
              THIS IS FOR DEMONSTRATION PURPOSES ONLY
            </div>
          </div>

          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-snes-purple snes-title">
                RETROTASK
              </h1>
              <div className="text-xl md:text-2xl text-snes-yellow font-terminal mb-8">
                🌈 Colorful Task Management 🌈
              </div>
            </div>
            
            <p className="text-xl mb-12 text-snes-darkPurple font-terminal max-w-3xl mx-auto leading-relaxed">
              A cheerful, colorful task management app inspired by SNES-era platformers! 
              Manage your tasks with bright colors, playful animations, and fun interactions.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link to="/signup" className="snes-button text-lg">
                🎮 GET STARTED
              </Link>
              <Link to="/login" className="snes-button text-lg bg-snes-blue text-white border-snes-blue shadow-snes-blue hover:bg-blue-400">
                🚀 LOGIN
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="snes-card text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2 text-snes-purple snes-subtitle">TASKS</h3>
              <p className="text-snes-darkPurple font-terminal">
                Create and manage tasks with colorful, playful interfaces
              </p>
            </div>
            
            <div className="snes-card-blue text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2 text-snes-blue snes-subtitle">SECURE</h3>
              <p className="text-snes-darkPurple font-terminal">
                Safe and secure authentication for your peace of mind
              </p>
            </div>
            
            <div className="snes-card-green text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2 text-snes-green snes-subtitle">EMAIL</h3>
              <p className="text-snes-darkPurple font-terminal">
                Get friendly email notifications for your tasks
              </p>
            </div>
          </div>

          {/* Fun Stats */}
          <div className="text-center mb-16">
            <div className="inline-block snes-card">
              <div className="flex space-x-8">
                <div>
                  <div className="text-snes-purple font-terminal text-lg">🌟 STARS</div>
                  <div className="text-3xl font-bold text-snes-yellow">⭐⭐⭐</div>
                </div>
                <div>
                  <div className="text-snes-purple font-terminal text-lg">🎮 LEVEL</div>
                  <div className="text-3xl font-bold text-snes-pink">01</div>
                </div>
                <div>
                  <div className="text-snes-purple font-terminal text-lg">🏆 SCORE</div>
                  <div className="text-3xl font-bold text-snes-orange">100</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rainbow Divider */}
          <div className="h-4 bg-rainbow-gradient rounded-full mb-16"></div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-snes-purple snes-title">
              Ready to Start?
            </h2>
            <p className="text-xl text-snes-darkPurple font-terminal mb-8">
              Join the colorful world of RetroTask today!
            </p>
            <Link to="/signup" className="snes-button text-xl">
              🎯 SIGN UP NOW
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-snes-purple border-t-4 border-snes-yellow p-6 text-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <div className="status-indicator active"></div>
            <p className="font-terminal text-sm">
              RETROTASK © 2026 | Colorful & Fun
            </p>
            <div className="status-indicator active"></div>
          </div>
          <p className="font-terminal text-xs text-snes-yellow">
            Built with React, Node.js, and Lots of Color! 🌈
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
