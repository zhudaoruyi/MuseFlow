import React from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isMuted,
  onPlayPause,
  onMute,
  onSkipBack,
  onSkipForward,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6">
      <button
        onClick={onSkipBack}
        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        <SkipBack className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={onPlayPause}
        className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white" />
        )}
      </button>

      <button
        onClick={onSkipForward}
        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        <SkipForward className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={onMute}
        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gray-700" />
        ) : (
          <Volume2 className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default AudioControls;