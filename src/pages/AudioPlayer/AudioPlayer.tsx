import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import AudioControls from './AudioControls';
import AudioUploader from './AudioUploader';
import AudioHistory from './AudioHistory';
import { useAudioStorage } from '../../hooks/useAudioStorage';

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  lastPlayed: string;
  blob?: Blob;
}

const AudioPlayer = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { tracks, addTrack, updateLastPlayed } = useAudioStorage();
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(79, 70, 229, 0.4)',
        progressColor: '#4f46e5',
        cursorColor: '#312e81',
        height: 96,
        cursorWidth: 2,
        normalize: true,
        fillParent: true,
        minPxPerSec: 100,
        interact: true,
        hideScrollbar: true,
        autoScroll: true,
        autoCenter: true,
        sampleRate: 44100,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        plugins: []
      });

      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current?.getDuration() || 0);
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on('finish', () => {
        setIsPlaying(false);
      });

      wavesurfer.current.on('interaction', () => {
        setIsPlaying(true);
        wavesurfer.current?.play();
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, []);

  const handleFileSelect = async (file: File) => {
    if (wavesurfer.current) {
      try {
        const newTrack = await addTrack(file);
        setCurrentTrack(newTrack);
        await wavesurfer.current.loadBlob(newTrack.blob!);
        setIsPlaying(false);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    }
  };

  const handleTrackSelect = async (track: AudioTrack) => {
    if (wavesurfer.current && track.blob) {
      setCurrentTrack(track);
      updateLastPlayed(track.id);
      
      try {
        await wavesurfer.current.loadBlob(track.blob);
        setIsPlaying(false);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
      if (currentTrack) {
        updateLastPlayed(currentTrack.id);
      }
    }
  };

  const toggleMute = () => {
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleSkipBack = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo(Math.max(currentTime - 10, 0) / duration);
    }
  };

  const handleSkipForward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo(Math.min(currentTime + 10, duration) / duration);
    }
  };

  return (
    <div className="max-w-4xl w-full space-y-6">
      <div className="bg-white rounded-xl shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentTrack ? currentTrack.name : '选择播放'}
          </h2>
          <span className="text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="relative">
          <div 
            ref={waveformRef} 
            className="w-full rounded-lg overflow-hidden bg-gray-50 hover:cursor-pointer"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-gray-50/10" />
        </div>

        <AudioControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlayPause={togglePlay}
          onMute={toggleMute}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
        />

        {!currentTrack && <AudioUploader onFileSelect={handleFileSelect} />}
      </div>

      <AudioHistory
        tracks={tracks}
        onTrackSelect={handleTrackSelect}
        currentTrackId={currentTrack?.id}
      />
    </div>
  );
};

export default AudioPlayer;