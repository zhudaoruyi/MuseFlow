import React from 'react';
import { Volume2 } from 'lucide-react';

export interface SoundOption {
  name: string;
  frequencies: {
    primary: number;
    secondary: number;
    subdivision: number;
  };
}

interface SoundControlProps {
  selectedSound: string;
  setSelectedSound: (sound: string) => void;
}

export const SOUND_OPTIONS: Record<string, SoundOption> = {
  classic: {
    name: "Classic",
    frequencies: {
      primary: 1000,
      secondary: 800,
      subdivision: 600
    }
  },
  digital: {
    name: "Digital",
    frequencies: {
      primary: 1500,
      secondary: 1200,
      subdivision: 900
    }
  },
  wooden: {
    name: "Wooden",
    frequencies: {
      primary: 800,
      secondary: 600,
      subdivision: 400
    }
  },
  soft: {
    name: "Soft",
    frequencies: {
      primary: 600,
      secondary: 400,
      subdivision: 300
    }
  }
};

const SoundControl = ({ selectedSound, setSelectedSound }: SoundControlProps) => {
  return (
    <div>
      <label className="block text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
        <Volume2 className="w-4 h-4" />
        Sound
      </label>
      <select
        value={selectedSound}
        onChange={(e) => setSelectedSound(e.target.value)}
        className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
      >
        {Object.entries(SOUND_OPTIONS).map(([key, sound]) => (
          <option key={key} value={key}>
            {sound.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SoundControl;