import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';
import PulseWave from './PulseWave';

export default function Credibility({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-24 sm:py-32">
      <PulseWave className="absolute right-[2%] top-[8%] hidden lg:block" color="#ff5fa2" width={240} delay={1.5} duration={9} variant={1} />
      <PulseWave className="absolute left-[1%] bottom-[6%] hidden xl:block" color="#22d3ee" width={210} delay={4} duration={7} variant={5} flip />
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
                <div className="glass-panel h-full p-6 transition-colors duration-300 hover:border-volt-500/40">
                  <span className="font-mono text-xs font-bold text-volt-400">
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
