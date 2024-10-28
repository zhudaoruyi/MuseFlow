import { useState, useEffect } from 'react';

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  lastPlayed: string;
  blob?: Blob;
}

const STORAGE_KEY = 'audio_history';

export const useAudioStorage = () => {
  const [tracks, setTracks] = useState<AudioTrack[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const tracksToStore = tracks.map(({ id, name, lastPlayed }) => ({
      id,
      name,
      lastPlayed
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracksToStore));
  }, [tracks]);

  const addTrack = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });
    const url = URL.createObjectURL(blob);
    
    const track: AudioTrack = {
      id: Date.now().toString(),
      name: file.name,
      url,
      lastPlayed: new Date().toISOString(),
      blob
    };

    setTracks(prev => {
      const exists = prev.find(t => t.name === track.name);
      if (exists) {
        return prev.map(t => 
          t.name === track.name 
            ? { ...track }
            : t
        );
      }
      return [track, ...prev].slice(0, 10); // Keep only last 10 tracks
    });

    return track;
  };

  const updateLastPlayed = (trackId: string) => {
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId
          ? { ...track, lastPlayed: new Date().toISOString() }
          : track
      )
    );
  };

  return {
    tracks: tracks.sort((a, b) => 
      new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
    ),
    addTrack,
    updateLastPlayed,
  };
};