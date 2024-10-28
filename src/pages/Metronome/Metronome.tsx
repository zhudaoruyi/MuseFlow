import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import Timer from './Timer';
import TempoControl from './TempoControl';
import TimeSignature from './TimeSignature';
import SubdivisionControl from './SubdivisionControl';
import SoundControl, { SOUND_OPTIONS } from './SoundControl';
import BeatDisplay from './BeatDisplay';

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [subdivision, setSubdivision] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedSound, setSelectedSound] = useState('classic');
  
  const audioContext = useRef<AudioContext | null>(null);
  const nextNoteTime = useRef(0);
  const timerID = useRef<number | null>(null);
  const currentBeat = useRef(0);
  const totalSubdivisions = useRef(0);
  
  useEffect(() => {
    audioContext.current = new AudioContext();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  useEffect(() => {
    totalSubdivisions.current = beatsPerMeasure * subdivision;
  }, [beatsPerMeasure, subdivision]);

  const scheduleNote = (time: number, beatIndex: number) => {
    const osc = audioContext.current!.createOscillator();
    const gainNode = audioContext.current!.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.current!.destination);

    const soundProfile = SOUND_OPTIONS[selectedSound].frequencies;
    
    // Determine if it's a primary beat (first beat of measure),
    // secondary beat (other main beats), or subdivision
    if (beatIndex === 0) {
      osc.frequency.value = soundProfile.primary; // First beat of measure
      gainNode.gain.value = 0.6;
    } else if (beatIndex % subdivision === 0) {
      osc.frequency.value = soundProfile.secondary; // Main beats
      gainNode.gain.value = 0.4;
    } else {
      osc.frequency.value = soundProfile.subdivision; // Subdivisions
      gainNode.gain.value = 0.2;
    }

    // Short attack and release to prevent clicking
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, time + 0.005);
    gainNode.gain.linearRampToValueAtTime(0, time + 0.1);
    
    osc.start(time);
    osc.stop(time + 0.1);
  };

  const nextNote = () => {
    const secondsPerBeat = 60.0 / bpm / subdivision;
    nextNoteTime.current += secondsPerBeat;
    
    // Update beat counter
    currentBeat.current++;
    if (currentBeat.current >= totalSubdivisions.current) {
      currentBeat.current = 0;
    }
    
    // Update display counter (show main beats only)
    if (currentBeat.current % subdivision === 0) {
      setCount((currentBeat.current / subdivision) + 1);
    }
  };

  const scheduler = () => {
    while (nextNoteTime.current < audioContext.current!.currentTime + 0.1) {
      scheduleNote(nextNoteTime.current, currentBeat.current);
      nextNote();
    }
    timerID.current = requestAnimationFrame(scheduler);
  };

  const startStop = () => {
    if (isPlaying) {
      if (timerID.current) cancelAnimationFrame(timerID.current);
      setIsPlaying(false);
    } else {
      if (audioContext.current?.state === 'suspended') {
        audioContext.current.resume();
      }
      currentBeat.current = -1; // Start at -1 so first nextNote() call sets it to 0
      nextNoteTime.current = audioContext.current!.currentTime;
      setIsPlaying(true);
      scheduler();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-2">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 w-full max-w-md shadow-xl">
        <Timer isPlaying={isPlaying} />
        <BeatDisplay count={count} bpm={bpm} />

        <div className="space-y-6">
          <TempoControl bpm={bpm} setBpm={setBpm} />

          <div className="grid grid-cols-2 gap-4">
            <TimeSignature 
              beatsPerMeasure={beatsPerMeasure}
              setBeatsPerMeasure={setBeatsPerMeasure}
            />
            <SubdivisionControl
              subdivision={subdivision}
              setSubdivision={setSubdivision}
            />
          </div>

          <SoundControl
            selectedSound={selectedSound}
            setSelectedSound={setSelectedSound}
          />

          <button
            onClick={startStop}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 
                     rounded-lg text-white font-bold text-lg 
                     hover:from-indigo-600 hover:to-purple-600 
                     transition-all flex items-center justify-center gap-2
                     focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Metronome;