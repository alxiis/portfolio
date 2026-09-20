import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import type { Locale } from '@/data/content';
import '@/app/globals.css';

const display = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

/** Balises <html>/<body> partagées par les deux langues (chaque langue a son layout racine). */
export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
