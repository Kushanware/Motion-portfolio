import { useState, useEffect } from 'react';

export interface UseTypewriterOptions {
  speed?: number;
  startDelay?: number;
}

export interface UseTypewriterReturn {
  displayed: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;
    let currentIndex = 0;

    setDisplayed('');
    setDone(false);

    timer = setTimeout(() => {
      interval = setInterval(() => {
        currentIndex += 1;
        setDisplayed(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
