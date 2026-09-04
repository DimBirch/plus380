import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { MapPin, ArrowUpRight } from 'lucide-react';
import type { EventRecord } from '@/lib/types';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import Logo from './Logo';

export default function EventCard({
  event,
  dict,
  priority = false,
}: {
  event: EventRecord;
  dict: Dictionary;
  priority?: boolean;
}) {
  const title = event.title_en;
  const isPast = new Date(event.event_date).getTime() < Date.now();
  const dateStr = format(new Date(event.event_date), 'd MMM yyyy', { locale: enUS });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_0_40px_-12px_rgba(227,27,35,0.65)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-700">
        {event.cover_image_url ? (
          <Image
            src={event.cover_image_url}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-mesh-glow bg-ink-800">
            <Logo variant="mark" size="lg" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-widest backdrop-blur-md ${
              isPast
                ? 'bg-white/10 text-bone-300'
                : 'bg-red-500/20 text-red-300 ring-1 ring-inset ring-red-400/40'
            }`}
          >
            {isPast ? dict.gallery.past : dict.gallery.upcoming}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink-950/60 text-bone-50 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-red-400">
          {dict.categories[event.category]} · {dateStr}
        </span>
        <h3 className="font-display text-lg font-semibold leading-tight text-bone-50">
          {title}
        </h3>
        {(event.city || event.country) && (
          <span className="mt-auto flex items-center gap-1.5 font-body text-sm text-bone-400">
            <MapPin size={14} className="text-bone-500" />
            {[event.city, event.country].filter(Boolean).join(', ')}
          </span>
        )}
      </div>
    </Link>
  );
}
