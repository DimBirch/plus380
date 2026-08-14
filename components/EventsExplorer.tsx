'use client';

import { useMemo, useState } from 'react';
import type { EventCategory, EventRecord } from '@/lib/types';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';
import EventCard from './EventCard';

type Tab = 'all' | 'upcoming' | 'past';

export default function EventsExplorer({
  events,
  locale,
  dict,
}: {
  events: EventRecord[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [category, setCategory] = useState<EventCategory | 'all'>('all');

  const now = Date.now();

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const isPast = new Date(e.event_date).getTime() < now;
        if (tab === 'upcoming') return !isPast;
        if (tab === 'past') return isPast;
        return true;
      })
      .filter((e) => (category === 'all' ? true : e.category === category))
      .sort((a, b) => {
        const at = new Date(a.event_date).getTime();
        const bt = new Date(b.event_date).getTime();
        return tab === 'past' ? bt - at : at - bt;
      });
  }, [events, tab, category, now]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'upcoming', label: dict.gallery.upcoming },
    { key: 'past', label: dict.gallery.past },
    { key: 'all', label: dict.gallery.all },
  ];

  const categories: (EventCategory | 'all')[] = [
    'all',
    'festival',
    'concert',
    'tour',
    'club',
    'corporate',
    'other',
  ];

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-max items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors ${
                tab === t.key
                  ? 'bg-red-500 text-ink-950'
                  : 'text-bone-400 hover:text-bone-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-widest transition-colors ${
                category === c
                  ? 'border-red-400/60 text-red-300'
                  : 'border-white/10 text-bone-500 hover:text-bone-300'
              }`}
            >
              {c === 'all' ? dict.gallery.all : dict.categories[c]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-dashed border-white/15 p-16 text-center font-body text-bone-500">
          {dict.gallery.empty}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} locale={locale} dict={dict} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
