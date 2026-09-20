import type { Metadata } from 'next';
import { fr } from './content.fr';
import { en } from './content.en';
import { profile } from './profile';

export type Locale = 'fr' | 'en';

export type Content = {
  meta: { title: string; description: string; ogLocale: string };
  ui: {
    skip: string;
    homeAria: string;
    navAria: string;
    nav: { href: string; label: string }[];
    cv: string;
    menu: string;
    close: string;
    langAria: string;
    kicker: string;
    badge: string;
    heroMeta: { seeking: string; seekingVal: string; start: string; startVal: string; base: string };
    ctaProjects: string;
    ctaCv: string;
    photoAlt: string;
    about: { label: string; title: string; asideAria: string; bring: string; languages: string; offscreen: string };
    experience: { label: string; title: string; tagsAria: string };
    projects: { label: string; title: string; goal: string; done: string; stackAria: string };
    skills: { label: string; title: string; education: string };
    contact: { label: string; lines: [string, string, string]; button: string; cvLink: string };
    footer: { designed: string; email: string };
  };
  role: string;
  degree: string;
  intro: string;
  about: string[];
  qualities: { name: string; text: string }[];
  languages: { name: string; level: string }[];
  extras: { mobility: string; interests: string[] };
  experiences: {
    period: string;
    status?: string;
    logo?: 'noous' | 'igensia';
    company: string;
    role: string;
    place: string;
    missions: { label: string; text: string }[];
    tags: string[];
  }[];
  projects: {
    number: string;
    name: string;
    year: string;
    summary: string;
    goal: string;
    done: string;
    stack: string[];
    github?: string;
    live?: string;
  }[];
  skills: { title: string; items: string[]; featured?: string[] }[];
  education: {
    period: string;
    note?: string;
    logo?: 'noous' | 'igensia';
    title: string;
    school: string;
    detail?: string;
  }[];
};

const contents: Record<Locale, Content> = { fr, en };

export const getContent = (locale: Locale): Content => contents[locale];

export function buildMetadata(locale: Locale): Metadata {
  const { title, description, ogLocale } = contents[locale].meta;
  return {
    title,
    description,
    authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
    openGraph: { title, description, type: 'website', locale: ogLocale },
    twitter: { card: 'summary', title, description },
  };
}
