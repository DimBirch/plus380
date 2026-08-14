import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';
import PulseWave from './PulseWave';

export default function ContactSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-mesh-glow opacity-70" />
      <PulseWave className="absolute left-[10%] top-[10%] hidden md:block" color="#ff5fa2" width={220} delay={0} duration={7.5} />
      <PulseWave className="absolute right-[8%] bottom-[16%] hidden md:block" color="#a78bfa" width={240} delay={3.5} duration={8} />
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow">{dict.contact.eyebrow}</span>
          <h2 className="section-heading mt-4">{dict.contact.heading}</h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-base leading-relaxed text-bone-400">
            {dict.contact.body}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="mailto:hello@rel1ve.eu" className="btn-primary">
              <Mail size={15} />
              hello@rel1ve.eu
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-14">
            <span className="eyebrow">{dict.contact.officesLabel}</span>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {dict.contact.offices.map((office) => (
                <div
                  key={office.city}
                  className={`flex items-center gap-2.5 rounded-full border px-5 py-3 backdrop-blur-sm ${
                    office.hq
                      ? 'border-volt-500/50 bg-volt-500/10'
                      : office.comingSoon
                        ? 'border-white/10 bg-white/[0.02] opacity-70'
                        : 'border-white/15 bg-white/[0.03]'
                  }`}
                >
                  <MapPin size={14} className={office.hq ? 'text-volt-400' : 'text-bone-500'} />
                  <span className="font-display text-sm font-semibold text-bone-50 sm:text-base">
                    {office.city}
                  </span>
                  <span className="font-body text-sm text-bone-400">{office.country}</span>
                  {office.hq && (
                    <span className="rounded-full bg-volt-500/20 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-volt-300 ring-1 ring-inset ring-volt-400/40">
                      {dict.contact.hqBadge}
                    </span>
                  )}
                  {office.comingSoon && (
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-bone-400 ring-1 ring-inset ring-white/15">
                      {dict.contact.comingSoonBadge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
