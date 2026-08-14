import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '+380 — Event Promotion Agency',
  description:
    '12+ years producing tours and festivals for world-class artists. From Ukraine to stages across the US, Canada, Europe, the UK, Turkey, the Balkans and the Gulf states.',
  icons: {
    icon: [
      {
        url:
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" rx="20" fill="%23050508"/%3E%3Ctext x="50" y="66" font-size="52" font-family="monospace" font-weight="700" fill="%238b5cf6" text-anchor="middle"%3E+%3C/text%3E%3C/svg%3E',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain min-h-screen bg-ink-950 font-body antialiased">{children}</body>
    </html>
  );
}
