'use client';

import { useEffect, useState } from 'react';
import { nav, profile } from '@/data/profile';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={`${profile.firstName} ${profile.lastName} — haut de page`}>
          <span className="brand-mark">{profile.monogram}</span>
          <span className="brand-name">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <nav id="main-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-u" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href={profile.cvFile} target="_blank" rel="noopener" className="cv-link">
            Mon CV <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Fermer' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}
