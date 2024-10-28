import React from 'react';

interface SubdivisionControlProps {
  subdivision: number;
  setSubdivision: (subdivision: number) => void;
}

const SubdivisionControl = ({ subdivision, setSubdivision }: SubdivisionControlProps) => {
  return (
    <div>
      <label className="block text-white/80 text-sm font-medium mb-2">Subdivision</label>
      <select
        value={subdivision}
        onChange={(e) => setSubdivision(Number(e.target.value))}
        className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
      >
        <option value={1}>Quarter Notes</option>
        <option value={2}>Eighth Notes</option>
        <option value={3}>Triplets</option>
        <option value={4}>Sixteenth Notes</option>
      </select>
    </div>
  );
};

export default SubdivisionControl;