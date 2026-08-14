import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { EventRecord } from '@/lib/types';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import EventCard from './EventCard';
import Reveal from './Reveal';
import PulseWave from './PulseWave';

export default function FeaturedEvents({
  events,
  locale,
  dict,
}: {
  events: EventRecord[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <PulseWave className="absolute left-[3%] top-[4%] hidden xl:block" color="#d4ff3f" width={200} delay={1.8} duration={6.8} variant={3} />
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">{dict.gallery.eyebrow}</span>
            <h2 className="section-heading mt-4">{dict.gallery.heading}</h2>
            <p className="mt-4 max-w-md font-body text-base text-bone-400">{dict.gallery.body}</p>
          </div>
          <Link
            href={`/${locale}/events`}
            className="btn-secondary shrink-0"
          >
            {dict.gallery.viewAll}
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>

        {events.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-white/15 p-16 text-center font-body text-bone-500">
            {dict.gallery.empty}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.id} delay={(i % 3) * 0.08}>
                <EventCard event={event} locale={locale} dict={dict} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
