'use client';

import { useEffect } from 'react';

/**
 * Parallaxe léger : les éléments `[data-parallax]` (gros numéros de section) se déplacent
 * à contre-sens du défilement, à ~15 % de sa vitesse. Un seul écouteur, throttlé par rAF.
 */
export default function ParallaxNumbers() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * -0.15;
        el.style.setProperty('--py', `${Math.max(-70, Math.min(70, offset)).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
