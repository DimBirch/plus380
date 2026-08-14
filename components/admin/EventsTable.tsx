'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { uk as ukLocale } from 'date-fns/locale';
import { Pencil, Trash2, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { EventRecord } from '@/lib/types';
import uk from '@/lib/i18n/dictionaries/uk';

export default function EventsTable({ initialEvents }: { initialEvents: EventRecord[] }) {
  const dict = uk.admin;
  const [events, setEvents] = useState(initialEvents);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm(dict.confirmDelete)) return;
    setDeletingId(id);
    const supabase = createClient();
    const { error } = await supabase.from('events').delete().eq('id', id);
    setDeletingId(null);
    if (!error) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } else {
      alert(error.message);
    }
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 p-16 text-center font-body text-bone-500">
        {dict.noEvents}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="divide-y divide-white/10">
        {events.map((event) => {
          const isPast = new Date(event.event_date).getTime() < Date.now();
          return (
            <div
              key={event.id}
              className="flex flex-col gap-4 bg-ink-900/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-ink-800">
                  {event.cover_image_url ? (
                    <Image src={event.cover_image_url} alt="" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-xs font-bold text-bone-600">
                      EEE80
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-semibold text-bone-50">
                      {event.title_uk}
                    </h3>
                    {event.featured && <Star size={13} className="fill-volt-400 text-volt-400" />}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
                    <span className={isPast ? 'text-bone-500' : 'text-volt-400'}>
                      {isPast ? 'Минула' : 'Майбутня'}
                    </span>
                    <span>·</span>
                    <span>{format(new Date(event.event_date), 'd MMM yyyy', { locale: ukLocale })}</span>
                    <span>·</span>
                    <span>{event.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-bone-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(event.id)}
                  disabled={deletingId === event.id}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-bone-300 transition-colors hover:border-flare-500/50 hover:text-flare-400 disabled:opacity-40"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
