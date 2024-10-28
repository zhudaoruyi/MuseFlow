import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const sampleTracks = [
  {
    title: "Moonlight Sonata",
    artist: "Ludwig van Beethoven",
    duration: "5:25",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Ludwig_van_Beethoven_-_piano_sonata_no._14_in_c-sharp_minor_%28moonlight%29%2C_op._27_no._2_-_i._adagio_sostenuto.ogg"
  },
  {
    title: "Für Elise",
    artist: "Ludwig van Beethoven",
    duration: "3:35",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Beethoven_-_F%C3%BCr_Elise.ogg"
  }
];

function PlayerPage() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#4F46E5',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3
      });

      wavesurfer.current.load(sampleTracks[currentTrack].url);

      wavesurfer.current.on('finish', () => {
        setIsPlaying(false);
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackChange = (direction: 'next' | 'prev') => {
    let newTrack = currentTrack;
    if (direction === 'next') {
      newTrack = (currentTrack + 1) % sampleTracks.length;
    } else {
      newTrack = currentTrack === 0 ? sampleTracks.length - 1 : currentTrack - 1;
    }
    setCurrentTrack(newTrack);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    wavesurfer.current?.setVolume(newVolume);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {sampleTracks[currentTrack].title}
          </h2>
          <p className="text-gray-600">{sampleTracks[currentTrack].artist}</p>
        </div>

        <div ref={waveformRef} className="mb-8" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Volume2 size={20} className="text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleTrackChange('prev')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <SkipBack size={24} className="text-gray-600" />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={() => handleTrackChange('next')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <SkipForward size={24} className="text-gray-600" />
            </button>
          </div>
          <div className="w-24" /> {/* Spacer for layout balance */}
        </div>

        <div className="space-y-2">
          {sampleTracks.map((track, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentTrack === index
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{track.title}</h3>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                </div>
                <span className="text-sm text-gray-500">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;