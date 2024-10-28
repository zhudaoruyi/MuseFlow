import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline';
import { Play, Pause, SkipBack, Volume2, VolumeX, Repeat, Repeat1 } from 'lucide-react';

interface WaveformPlayerProps {
  audioUrl: string;
  onEnded: () => void;
  isPlaylistLoop: boolean;
  onPlaylistLoopToggle: () => void;
  initialZoom?: number;
}

const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ 
  audioUrl, 
  onEnded,
  isPlaylistLoop,
  onPlaylistLoopToggle,
  initialZoom = 100
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSingleLoop, setSingleLoop] = useState(false);

  // Initialize WaveSurfer
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4f46e5',
        progressColor: '#818cf8',
        cursorColor: '#312e81',
        barWidth: 1,
        barGap: 1,
        height: 80,
        cursorWidth: 1,
        normalize: false,
        minPxPerSec: initialZoom,
        plugins: [
          TimelinePlugin.create({
            container: timelineRef.current ? timelineRef.current : undefined
          })
        ]
      });

      // Event listeners
      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current?.getDuration() || 0);
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on('play', () => setIsPlaying(true));
      wavesurfer.current.on('pause', () => setIsPlaying(false));

      wavesurfer.current.on('finish', () => {
        if (isSingleLoop) {
          wavesurfer.current?.play();
        } else {
          setIsPlaying(false);
          onEnded();
        }
      });

      // Load audio
      wavesurfer.current.load(audioUrl);
      wavesurfer.current.setVolume(volume);

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [audioUrl]); // Only recreate when audio URL changes

  // Handle volume changes
  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    wavesurfer.current?.playPause();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleSkipBack = () => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(0);
    }
  };

  const toggleSingleLoop = () => {
    setSingleLoop(!isSingleLoop);
  };

  // Handle zoom change
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zoomLevel = parseInt(e.target.value);
    if (wavesurfer.current) {
      console.log(`缩放值：${zoomLevel}`);
      wavesurfer.current.zoom(zoomLevel);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-2">
      <div ref={waveformRef} />
      <div ref={timelineRef} className="mb-4" />
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSkipBack}
            className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <SkipBack className="w-6 h-6 text-indigo-600" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-indigo-600" />
            ) : (
              <Volume2 className="w-6 h-6 text-indigo-600" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSingleLoop}
            className={`p-2 rounded-full transition-colors ${
              isSingleLoop ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-indigo-50 text-gray-600'
            }`}
            title="Loop current track"
          >
            <Repeat1 className="w-6 h-6" />
          </button>

          <button
            onClick={onPlaylistLoopToggle}
            className={`p-2 rounded-full transition-colors ${
              isPlaylistLoop ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-indigo-50 text-gray-600'
            }`}
            title="Loop playlist"
          >
            <Repeat className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2">
            缩放
            <input
              type="range"
              min="2"
              max="200"
              defaultValue={initialZoom}
              onChange={handleZoomChange}
              className="w-48"
            />
          </label>
        </div>

      </div>
    </div>
  );
};

export default WaveformPlayer;