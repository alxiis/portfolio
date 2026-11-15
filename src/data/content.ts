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
    /** Titre de la fenêtre « terminal » du hero. */
    termTitle: string;
    ctaProjects: string;
    ctaCv: string;
    photoAlt: string;
    about: { label: string; title: string; asideAria: string; bring: string; languages: string; offscreen: string };
    experience: { label: string; title: string; tagsAria: string };
    projects: {
      label: string;
      title: string;
      goal: string;
      done: string;
      stackAria: string;
      layers: string;
      code: string;
      live: string;
    };
    skills: { label: string; title: string; education: string };
    contact: { label: string; lines: [string, string, string]; button: string; cvLink: string; recapAria: string };
    footer: { designed: string; email: string };
  };
  role: string;
  degree: string;
  intro: string;
  /** Domaines visés, affichés dans le bandeau défilant sous le hero. */
  domains: string[];
  about: string[];
  qualities: { name: string; text: string }[];
  languages: { name: string; level: string }[];
  extras: { mobility: string; interests: string[] };
  experiences: {
    period: string;
    status?: string;
    /** Poste actuel : pastille rouge et nœud plein sur la frise. */
    current?: boolean;
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
    /** Briques de l'infrastructure, par rôle (remplace la liste de tags sur le projet principal). */
    layers?: { role: string; tools: string }[];
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

// URL publique du site (ex. https://alxiis.github.io), définie au build par le workflow.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const getContent = (locale: Locale): Content => contents[locale];

export function buildMetadata(locale: Locale): Metadata {
  const { title, description, ogLocale } = contents[locale].meta;
  return {
    title,
    description,
    authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
    // Sans URL publique connue, pas de canonical / hreflang (ils doivent être absolus).
    ...(siteUrl && {
      metadataBase: new URL(siteUrl),
      alternates: {
        canonical: `${basePath}${locale === 'fr' ? '/' : '/en/'}`,
        languages: { fr: `${basePath}/`, en: `${basePath}/en/`, 'x-default': `${basePath}/` },
      },
    }),
    openGraph: { title, description, type: 'website', locale: ogLocale },
    twitter: { card: 'summary', title, description },
  };
}
