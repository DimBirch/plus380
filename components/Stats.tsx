import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Reveal from './Reveal';
import PulseWave from './PulseWave';

export default function Stats({ dict }: { dict: Dictionary }) {
  const items = [dict.stats.years, dict.stats.festival, dict.stats.artists, dict.stats.regions];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink-950 py-16 sm:py-20">
      <PulseWave className="absolute right-[2%] top-[-10%] hidden xl:block" color="#67e8f9" width={200} delay={2.5} duration={6} variant={4} />
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="border-l-2 border-volt-500/50 pl-4">
                <div className="font-display text-4xl font-bold text-bone-50 sm:text-5xl">
                  {item.value}
                </div>
                <div className="mt-1 font-body text-xs text-bone-400 sm:text-sm">
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
