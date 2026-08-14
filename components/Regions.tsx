import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';
export default function Regions({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink-900 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{dict.regions.eyebrow}</span>
          <h2 className="section-heading mt-4">{dict.regions.heading}</h2>
          <p className="mt-6 font-body text-base leading-relaxed text-bone-400">
            {dict.regions.body}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {dict.regions.list.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.04}>
              <div
                className={`flex items-center gap-2.5 rounded-full border px-5 py-3 backdrop-blur-sm ${
                  r.note
                    ? 'border-red-500/50 bg-red-500/10'
                    : 'border-white/15 bg-white/[0.03]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span className="font-display text-sm font-semibold text-bone-50 sm:text-base">
                  {r.name}
                </span>
                {r.note && (
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-red-300">
                    {r.note}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
