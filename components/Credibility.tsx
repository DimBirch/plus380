import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';

export default function Credibility({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <Reveal>
            <span className="eyebrow">{dict.credibility.eyebrow}</span>
            <h2 className="section-heading mt-4">{dict.credibility.heading}</h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-bone-400">
              {dict.credibility.body}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dict.credibility.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="glass-panel h-full p-6 transition-colors duration-300 hover:border-red-500/40">
                  <span className="font-mono text-xs font-bold text-red-400">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-bone-50">
                    {v.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-bone-400">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
