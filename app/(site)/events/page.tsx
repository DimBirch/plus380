import en from '@/lib/i18n/dictionaries/en';
import { getAllEvents } from '@/lib/data/events';
import EventsExplorer from '@/components/EventsExplorer';

export default async function EventsPage() {
  const dict = en;
  const events = await getAllEvents();

  return (
    <div className="relative min-h-screen bg-ink-950 pb-24 pt-36 sm:pt-40">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-mesh-glow opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <span className="eyebrow">{dict.gallery.eyebrow}</span>
        <h1 className="section-heading mt-4">{dict.gallery.heading}</h1>
        <p className="mt-4 max-w-lg font-body text-base text-bone-400">{dict.gallery.body}</p>

        <div className="mt-14">
          <EventsExplorer events={events} dict={dict} />
        </div>
      </div>
    </div>
  );
}
