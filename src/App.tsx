import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home, Music, Settings, Timer } from 'lucide-react';
import HomePage from './pages/HomePage';
import Metronome from './pages/Metronome/Metronome';
import AudioPlayer from './pages/AudioPlayer/AudioPlayer';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h- bg-gray-50">
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/metro" element={<Metronome />} />
            <Route path="/player" element={<AudioPlayer />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
          <div className="flex justify-around items-center h-16">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`
              }
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </NavLink>
            
            <NavLink
              to="/metro"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`
              }
            >
              <Timer size={24} />
              <span className="text-xs">Metro</span>
            </NavLink>
            
            <NavLink
              to="/player"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`
              }
            >
              <Music size={24} />
              <span className="text-xs">Player</span>
            </NavLink>
            
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`
              }
            >
              <Settings size={24} />
              <span className="text-xs">Settings</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;