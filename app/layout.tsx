import type { Metadata } from 'next';
import { Unbounded, Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Headings/body copy. The public site is English-only, but the admin
// panel's UI is Ukrainian, so these still need Cyrillic subsets.
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
  title: 'THREEEIGHTY — Event Promotion Agency. Tours, Festivals, Concerts',
  description: 'The whole world.',
  openGraph: {
    title: 'THREEEIGHTY — Event Promotion Agency. Tours, Festivals, Concerts',
    description: 'The whole world.',
    siteName: 'THREEEIGHTY',
    locale: 'en_US',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
      },
    ],
  },
};

// Runs before paint so a returning light-mode visitor never sees a dark
// flash. The site defaults to dark (no attribute needed for that case).
const themeInitScript = `
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
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
