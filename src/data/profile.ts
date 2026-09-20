/**
 * Données communes aux deux langues (identité, contacts, images).
 * Les textes traduits sont dans content.fr.ts et content.en.ts.
 * Source : CV-Fievet_Alexis_2026_2.pdf
 */

// Préfixe du site (ex. /portfolio sur GitHub Pages), vide en local.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const profile = {
  firstName: 'Alexis',
  lastName: 'Fievet',
  monogram: 'AF',
  city: 'Colomiers (31)',
  email: 'fvt.alexiis@gmail.com',
  phone: '06 52 14 41 77',
  cvFile: base + '/CV-Fievet_Alexis.pdf',
  photo: { src: base + '/img/alexis.webp', width: 720, height: 960 },
  // Laisse vide pour masquer le lien.
  linkedin: 'https://www.linkedin.com/in/alexis-fievet/',
  github: 'https://github.com/alxiis',
  year: 2026,
};

export type Logo = { src: string; width: number; height: number; alt: string };

export const logos: Record<'noous' | 'igensia', Logo> = {
  noous: { src: base + '/img/noous.webp', width: 400, height: 154, alt: 'Logo NOOUS' },
  igensia: { src: base + '/img/igensia.webp', width: 480, height: 176, alt: 'Logo Groupe Igensia Education' },
};
