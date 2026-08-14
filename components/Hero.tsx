import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-24">
      {/* Background layers */}
      <div className="absolute inset-0 bg-mesh-glow" />
      <div className="absolute inset-0 bg-sound-wave bg-[size:120px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      <div className="absolute -right-32 top-1/3 h-[36rem] w-[36rem] rounded-full border border-white/[0.06]" />
      <div className="absolute -right-32 top-1/3 h-[26rem] w-[26rem] translate-x-10 translate-y-10 rounded-full border border-volt-500/20 animate-spin-slow" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-acid-500 shadow-[0_0_8px_2px_rgba(194,242,41,0.8)]" />
            <span className="eyebrow !text-bone-300">{dict.hero.eyebrow}</span>
          </div>

          <h1 className="font-display text-[13vw] font-bold leading-[0.94] tracking-tight text-bone-50 sm:text-7xl md:text-8xl">
            <span className="block">{dict.hero.titleLine1}</span>
            <span className="text-gradient block">{dict.hero.titleLine2}</span>
          </h1>

          <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-bone-400 sm:text-lg">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/events`} className="btn-primary">
              {dict.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}#contact`} className="btn-secondary">
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone-500 sm:flex">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">
          {dict.hero.scroll}
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
