import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import WaveformPlayer from './WaveformPlayer';
import Playlist from './Playlist';

interface Song {
  id: string;
  name: string;
  url: string;
}

const AudioPlayer = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaylistLoop, setIsPlaylistLoop] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        const newSong: Song = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url,
        };
        setSongs((prev) => [...prev, newSong]);
        if (!currentSong) {
          setCurrentSong(newSong);
        }
      });
    }
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
  };

  const handleSongRemove = (id: string) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
    if (currentSong?.id === id) {
      const remainingSongs = songs.filter((song) => song.id !== id);
      setCurrentSong(remainingSongs[0] || null);
    }
  };

  const handleSongEnd = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
    } else if (isPlaylistLoop && songs.length > 0) {
      setCurrentSong(songs[0]);
    }
  };

  const togglePlaylistLoop = () => {
    setIsPlaylistLoop(!isPlaylistLoop);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-2">
        <div className="max-w-4xl mx-auto space-y-6">
          {currentSong ? (
            <WaveformPlayer
              audioUrl={currentSong.url}
              onEnded={handleSongEnd}
              isPlaylistLoop={isPlaylistLoop}
              onPlaylistLoopToggle={togglePlaylistLoop}
              initialZoom={100}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 mb-4">选择音乐</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
              添加音乐
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <Playlist
            songs={songs}
            currentSong={currentSong}
            onSongSelect={handleSongSelect}
            onSongRemove={handleSongRemove}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;