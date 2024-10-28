import React from 'react';
import { Music, Trash2 } from 'lucide-react';

interface Song {
  id: string;
  name: string;
  url: string;
}

interface PlaylistProps {
  songs: Song[];
  currentSong: Song | null;
  onSongSelect: (song: Song) => void;
  onSongRemove: (id: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSong,
  onSongSelect,
  onSongRemove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">播放列表</h2>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              currentSong?.id === song.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSongSelect(song)}
          >
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5" />
              <span className="font-medium">{song.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSongRemove(song.id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        ))}
        {songs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            播放列表空
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;