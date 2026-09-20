import type { Metadata, Viewport } from 'next';
import RootShell from '@/components/RootShell';
import { buildMetadata } from '@/data/content';

export const metadata: Metadata = buildMetadata('en');
export const viewport: Viewport = { themeColor: '#050505' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
