'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Content, Locale } from '@/data/content';
import { profile } from '@/data/profile';

export default function Header({ locale, ui }: { locale: Locale; ui: Content['ui'] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

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

  // Section en cours de lecture : celle qui traverse une bande située vers le haut de l'écran.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = ui.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
          else setActive((cur) => (cur === `#${e.target.id}` ? null : cur));
        }
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ui.nav]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={ui.homeAria}>
          <span className="brand-mark">{profile.monogram}</span>
          <span className="brand-name">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <nav id="main-nav" className={`nav${open ? ' is-open' : ''}`} aria-label={ui.navAria}>
          {ui.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-u"
              aria-current={active === item.href ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang" role="group" aria-label={ui.langAria}>
            {locale === 'fr' ? (
              <span aria-current="true">FR</span>
            ) : (
              <Link href="/" hrefLang="fr" lang="fr" aria-label="Français">
                FR
              </Link>
            )}
            <span className="lang-sep" aria-hidden="true">/</span>
            {locale === 'en' ? (
              <span aria-current="true">EN</span>
            ) : (
              <Link href="/en/" hrefLang="en" lang="en" aria-label="English">
                EN
              </Link>
            )}
          </div>
          <a href={profile.cvFile} target="_blank" rel="noopener" className="cv-link">
            {ui.cv} <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? ui.close : ui.menu}
          </button>
        </div>
      </div>
    </header>
  );
}
