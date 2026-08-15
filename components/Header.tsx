'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const rest = pathname.split('/').slice(2).join('/');
  const altLocale: Locale = locale === 'uk' ? 'en' : 'uk';
  const altHref = `/${altLocale}${rest ? `/${rest}` : ''}`;

  const links = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href={`/${locale}`} className="group flex items-center gap-2">
          <Logo size="sm" />
          <span className="hidden h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_2px_rgba(227,27,35,0.9)] group-hover:animate-pulseGlow sm:block" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-bone-300 transition-colors hover:text-red-400"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link
            href={altHref}
            className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-bone-300 transition-colors hover:border-red-400/60 hover:text-red-400"
          >
            {locale === 'uk' ? 'EN' : 'UA'}
          </Link>
          <Link href={`/${locale}#contact`} className="btn-primary !px-5 !py-2.5">
            {dict.nav.bookUs}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-white/15 p-2 text-bone-50"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-bone-300"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={altHref}
                className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-bone-300"
              >
                {locale === 'uk' ? 'EN' : 'UA'}
              </Link>
              <Link href={`/${locale}#contact`} className="btn-primary !px-5 !py-2.5">
                {dict.nav.bookUs}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
