import React, { useState, useRef } from 'react';
import { Play, Pause, Plus, Minus } from 'lucide-react';

function MetroPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [beats, setBeats] = useState(4);
  const audioContext = useRef<AudioContext | null>(null);
  const nextNoteTime = useRef(0);
  const timerID = useRef<number | null>(null);
  const currentBeat = useRef(0);

  const scheduleNote = (time: number) => {
    const osc = audioContext.current!.createOscillator();
    const envelope = audioContext.current!.createGain();

    osc.frequency.value = currentBeat.current === 0 ? 1000 : 800;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioContext.current!.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  };

  const scheduler = () => {
    while (nextNoteTime.current < audioContext.current!.currentTime + 0.1) {
      scheduleNote(nextNoteTime.current);
      nextNoteTime.current += 60.0 / bpm;
      currentBeat.current = (currentBeat.current + 1) % beats;
    }
    timerID.current = requestAnimationFrame(scheduler);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      if (timerID.current) cancelAnimationFrame(timerID.current);
      setIsPlaying(false);
    } else {
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }
      currentBeat.current = 0;
      nextNoteTime.current = audioContext.current.currentTime + 0.05;
      scheduler();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{bpm} BPM</h2>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setBpm(Math.max(40, bpm - 1))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Minus size={24} className="text-gray-600" />
            </button>
            <input
              type="range"
              min="40"
              max="208"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <button
              onClick={() => setBpm(Math.min(208, bpm + 1))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Plus size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beats per measure: {beats}
          </label>
          <input
            type="range"
            min="1"
            max="12"
            value={beats}
            onChange={(e) => setBeats(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <button
          onClick={toggleMetronome}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-semibold transition-colors ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={24} />
              Stop
            </>
          ) : (
            <>
              <Play size={24} />
              Start
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default MetroPage;