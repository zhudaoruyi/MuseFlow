import React from 'react';

interface BeatDisplayProps {
  count: number;
  bpm: number;
}

const BeatDisplay = ({ count, bpm }: BeatDisplayProps) => {
  return (
    <div className="text-center mb-8">
      <div className="text-8xl font-mono font-bold text-white mb-4 
                    transition-all duration-100 transform hover:scale-105">
        {count}
      </div>
      <div className="text-2xl text-white/80">{bpm} BPM</div>
    </div>
  );
};

export default BeatDisplay;