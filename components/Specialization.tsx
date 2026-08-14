import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';
export default function Specialization({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <span className="eyebrow">{dict.specialization.eyebrow}</span>
            <h2 className="section-heading mt-4">{dict.specialization.heading}</h2>
            <p className="mt-6 font-body text-base leading-relaxed text-bone-400">
              {dict.specialization.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {dict.specialization.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-widest text-bone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
              <div className="absolute inset-0 bg-mesh-glow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-red-500/40 sm:h-72 sm:w-72">
                  <div className="absolute h-40 w-40 animate-spin-slow rounded-full border border-dashed border-red-400/40 sm:h-52 sm:w-52" />
                  <span className="font-display text-6xl font-bold text-bone-50 sm:text-7xl">
                    150K<span className="text-red-500">+</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
