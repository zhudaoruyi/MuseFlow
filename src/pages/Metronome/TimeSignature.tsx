import React from 'react';

interface TimeSignatureProps {
  beatsPerMeasure: number;
  setBeatsPerMeasure: (beats: number) => void;
}

const TimeSignature = ({ beatsPerMeasure, setBeatsPerMeasure }: TimeSignatureProps) => {
  return (
    <div>
      <label className="block text-white/80 text-sm font-medium mb-2">Time Signature</label>
      <select
        value={beatsPerMeasure}
        onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
        className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
      >
        <option value="1">1/1</option>
        <option value="2">2/4</option>
        <option value="3">3/4</option>
        <option value="4">4/4</option>
        <option value="6">6/8</option>
      </select>
    </div>
  );
};

export default TimeSignature;