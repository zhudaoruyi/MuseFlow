import React from 'react';
import { Clock, Play } from 'lucide-react';

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  lastPlayed: string;
}

interface AudioHistoryProps {
  tracks: AudioTrack[];
  onTrackSelect: (track: AudioTrack) => void;
  currentTrackId?: string;
}

const AudioHistory: React.FC<AudioHistoryProps> = ({ tracks, onTrackSelect, currentTrackId }) => {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">最近播放</h3>
      </div>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
              currentTrackId === track.id ? 'bg-indigo-50' : ''
            }`}
            onClick={() => onTrackSelect(track)}
          >
            <div className="flex items-center gap-3">
              <Play className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">{track.name}</p>
                <p className="text-sm text-gray-500">
                  Last played: {new Date(track.lastPlayed).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioHistory;