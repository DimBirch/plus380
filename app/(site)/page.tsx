import en from '@/lib/i18n/dictionaries/en';
import { getFeaturedEvents } from '@/lib/data/events';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ArtistMarquee from '@/components/ArtistMarquee';
import Credibility from '@/components/Credibility';
import Regions from '@/components/Regions';
import Specialization from '@/components/Specialization';
import FeaturedEvents from '@/components/FeaturedEvents';
import ContactSection from '@/components/ContactSection';

export default async function HomePage() {
  const dict = en;
  const events = await getFeaturedEvents(6);

  return (
    <>
      <Hero dict={dict} />
      <Stats dict={dict} />
      <div>
        <p className="sr-only">{dict.marquee.heading}</p>
        <ArtistMarquee />
      </div>
      <Credibility dict={dict} />
      <Regions dict={dict} />
      <Specialization dict={dict} />
      <FeaturedEvents events={events} dict={dict} />
      <ContactSection dict={dict} />
    </>
  );
}
