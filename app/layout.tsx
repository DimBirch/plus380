import type { Metadata } from 'next';
import { Unbounded, Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Headings/body copy — needs Cyrillic for the UA locale.
const display = Unbounded({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

// Wordmark only ("THREEEIGHTY" is never translated) — Latin is enough.
const logo = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-logo',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THREEEIGHTY — Epic Event Experience',
  description: 'The whole world.',
  openGraph: {
    title: 'THREEEIGHTY — Epic Event Experience',
    description: 'The whole world.',
    siteName: 'THREEEIGHTY',
  },
  icons: {
    icon: [
      {
        url:
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" rx="18" fill="%23e31b23"/%3E%3Ctext x="50" y="65" font-size="38" font-family="Arial, sans-serif" font-weight="900" fill="%23ffffff" text-anchor="middle"%3E380%3C/text%3E%3C/svg%3E',
      },
    ],
  },
};

// Runs before paint so a returning dark-mode visitor never sees a light
// flash. The site defaults to light (no attribute needed for that case).
const themeInitScript = `
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${logo.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="grain min-h-screen bg-ink-950 font-body antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
