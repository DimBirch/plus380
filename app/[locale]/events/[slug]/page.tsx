import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { uk as ukLocale, enUS } from 'date-fns/locale';
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Users } from 'lucide-react';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getEventBySlug } from '@/lib/data/events';
import GalleryLightbox from '@/components/GalleryLightbox';

export default async function EventDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const event = await getEventBySlug(params.slug);

  if (!event) notFound();

  const title = locale === 'uk' ? event.title_uk : event.title_en;
  const description = locale === 'uk' ? event.description_uk : event.description_en;
  const isPast = new Date(event.event_date).getTime() < Date.now();
  const dateStr = format(new Date(event.event_date), 'd MMMM yyyy', {
    locale: locale === 'uk' ? ukLocale : enUS,
  });

  const infoItems = [
    { icon: CalendarDays, label: dict.gallery.dateLabel, value: dateStr },
    {
      icon: MapPin,
      label: dict.gallery.venueLabel,
      value: [event.venue, event.city, event.country].filter(Boolean).join(', ') || '—',
    },
    ...(event.attendees_count
      ? [
          {
            icon: Users,
            label: dict.gallery.attendeesLabel,
            value: event.attendees_count.toLocaleString(locale === 'uk' ? 'uk-UA' : 'en-US'),
          },
        ]
      : []),
  ];

  return (
    <div className="relative min-h-screen bg-ink-950 pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Link
          href={`/${locale}/events`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-400 hover:text-volt-400"
        >
          <ArrowLeft size={14} />
          {dict.gallery.backToEvents}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-widest ${
              isPast ? 'bg-white/10 text-bone-300' : 'bg-volt-500/20 text-volt-300 ring-1 ring-inset ring-volt-400/40'
            }`}
          >
            {isPast ? dict.gallery.past : dict.gallery.upcoming}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-cyan-400">
            {dict.categories[event.category]}
          </span>
        </div>

        <h1 className="section-heading mt-5">{title}</h1>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
          {event.cover_image_url ? (
            <Image
              src={event.cover_image_url}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-mesh-glow">
              <span className="font-display text-6xl font-bold text-bone-500">EEE80</span>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {description && (
              <p className="font-body text-lg leading-relaxed text-bone-300">{description}</p>
            )}

            {event.gallery_images && event.gallery_images.length > 0 && (
              <div className="mt-12">
                <span className="eyebrow">{dict.gallery.gallerySection}</span>
                <div className="mt-5">
                  <GalleryLightbox images={event.gallery_images} alt={title} />
                </div>
              </div>
            )}
          </div>

          <aside className="glass-panel h-max space-y-6 p-6">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon size={16} className="mt-0.5 shrink-0 text-volt-400" />
                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
                    {item.label}
                  </div>
                  <div className="mt-0.5 font-body text-sm text-bone-50">{item.value}</div>
                </div>
              </div>
            ))}

            {event.ticket_url && !isPast && (
              <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                {dict.gallery.ticketCta}
                <ArrowUpRight size={14} />
              </a>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
