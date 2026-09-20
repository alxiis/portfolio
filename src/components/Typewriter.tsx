'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  /** ms par caractère */
  speed?: number;
  /** ms avant de commencer */
  delay?: number;
  className?: string;
};

/**
 * Affiche `text` lettre par lettre au montage.
 * - Le texte complet reste dans le DOM (invisible) : pas de saut de mise en page.
 * - Lecteurs d'écran : ils lisent le texte complet, jamais l'animation.
 * - prefers-reduced-motion : le texte s'affiche directement.
 */
export default function Typewriter({ text, speed = 45, delay = 0, className }: Props) {
  const [count, setCount] = useState(text.length);
  const [caret, setCaret] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    let hideCaret: ReturnType<typeof setTimeout> | undefined;
    setCount(0);

    const start = setTimeout(() => {
      setCaret(true);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          hideCaret = setTimeout(() => setCaret(false), 1400);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearTimeout(hideCaret);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className={`tw${className ? ` ${className}` : ''}`}>
      <span className="sr-only">{text}</span>
      <span className="tw-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="tw-live" aria-hidden="true">
        {text.slice(0, count)}
        {caret && <span className="tw-caret" />}
      </span>
    </span>
  );
}
