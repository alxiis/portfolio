import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import { profile } from '@/data/profile';
import './globals.css';

const display = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const title = `${profile.firstName} ${profile.lastName} — Portfolio · Infrastructures, Réseaux & Cybersécurité`;
const description = `${profile.firstName} ${profile.lastName}, ${profile.role.toLowerCase()} chez NOOUS, en ${profile.degree}. ${profile.seeking} — ${profile.seekingSince.toLowerCase()}.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', locale: 'fr_FR' },
  twitter: { card: 'summary', title, description },
};

export const viewport: Viewport = { themeColor: '#050505' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
