import { useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function useTextScramble(finalText: string, trigger = true) {
  const ref = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    let iteration = 0;
    const maxIterations = finalText.length * 3;

    const interval = setInterval(() => {
      el.textContent = finalText
        .split("")
        .map((char, index) => {
          if (index < iteration / 3) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      iteration++;
      if (iteration > maxIterations) {
        clearInterval(interval);
        el.textContent = finalText;
      }
    }, 30);

    frameRef.current = interval as unknown as number;
  }, [finalText]);

  useEffect(() => {
    if (trigger) scramble();
    return () => clearInterval(frameRef.current);
  }, [trigger, scramble]);

  return ref;
}
