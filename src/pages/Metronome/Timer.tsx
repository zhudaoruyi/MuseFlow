import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ isPlaying }: { isPlaying: boolean }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let interval: number;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prev => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = prev.minutes + Math.floor(newSeconds / 60);
          const newHours = prev.hours + Math.floor(newMinutes / 60);
          
          return {
            hours: newHours,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center gap-2 text-white/80">
      <Clock className="w-4 h-4" />
      <span className="font-mono">
        {String(time.hours).padStart(2, '0')}:
        {String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;