import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTime = 0, countdown = false) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (countdown) {
            if (prevTime <= 1) {
              clearInterval(intervalRef.current);
              setIsFinished(true);
              setIsActive(false);
              return 0;
            }
            return prevTime - 1;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, countdown]);

  const start = () => {
    setIsFinished(false);
    setIsActive(true);
  };
  
  const pause = () => setIsActive(false);
  
  const reset = (newTime = initialTime) => {
    setIsActive(false);
    setIsFinished(false);
    setTime(newTime);
  };

  return { time, isActive, isFinished, start, pause, reset, setTime };
};
