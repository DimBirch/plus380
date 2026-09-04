import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Logo from './Logo';

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo size="lg" showTagline />
            <p className="mt-4 font-body text-sm leading-relaxed text-bone-400">
              {dict.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hello@rel1ve.eu"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone-300 transition-colors hover:border-red-400/60 hover:text-red-400"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone-300 transition-colors hover:border-red-400/60 hover:text-red-400"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone-300 transition-colors hover:border-red-400/60 hover:text-red-400"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="eyebrow mb-4">{dict.nav.home}</p>
              <div className="flex flex-col gap-2.5 font-body text-sm text-bone-400">
                <Link href="/#about" className="hover:text-bone-50">
                  {dict.nav.about}
                </Link>
                <Link href="/events" className="hover:text-bone-50">
                  {dict.nav.events}
                </Link>
                <Link href="/#contact" className="hover:text-bone-50">
                  {dict.nav.contact}
                </Link>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">{dict.contact.emailLabel}</p>
              <a
                href="mailto:hello@rel1ve.eu"
                className="font-body text-sm text-bone-400 hover:text-bone-50"
              >
                hello@rel1ve.eu
              </a>
              <p className="mt-3 font-body text-sm text-bone-400">{dict.contact.locationHq}</p>
              <p className="mt-1 font-display text-sm font-semibold text-gradient">
                {dict.contact.locationTagline}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[0.7rem] uppercase tracking-widest text-bone-500 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} THREEEIGHTY. {dict.footer.rights}</span>
          <span>Breda → Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
