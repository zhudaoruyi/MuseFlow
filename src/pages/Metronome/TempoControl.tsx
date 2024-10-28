import React from 'react';

interface TempoControlProps {
  bpm: number;
  setBpm: (bpm: number) => void;
}

const TempoControl = ({ bpm, setBpm }: TempoControlProps) => {
  const handleBpmChange = (value: number) => {
    setBpm(Math.min(Math.max(value, 20), 240));
  };

  return (
    <div className="space-y-2">
      <label className="block text-white/80 text-sm font-medium">Tempo</label>
      <input
        type="range"
        min="20"
        max="240"
        value={bpm}
        onChange={(e) => handleBpmChange(Number(e.target.value))}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="number"
        value={bpm}
        onChange={(e) => handleBpmChange(Number(e.target.value))}
        className="w-20 px-3 py-2 bg-white/10 rounded-lg text-white text-center"
        min="20"
        max="240"
      />
    </div>
  );
};

export default TempoControl;