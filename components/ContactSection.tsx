import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';

export default function ContactSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-mesh-glow opacity-70" />
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
          <div className="mt-6 flex items-center justify-center gap-2 font-body text-sm text-bone-500">
            <MapPin size={14} />
            {dict.contact.location}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
