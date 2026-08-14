import { isLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getFeaturedEvents } from '@/lib/data/events';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ArtistMarquee from '@/components/ArtistMarquee';
import Credibility from '@/components/Credibility';
import Regions from '@/components/Regions';
import Specialization from '@/components/Specialization';
import FeaturedEvents from '@/components/FeaturedEvents';
import ContactSection from '@/components/ContactSection';

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const events = await getFeaturedEvents(6);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Stats dict={dict} />
      <div>
        <p className="sr-only">{dict.marquee.heading}</p>
        <ArtistMarquee />
      </div>
      <Credibility dict={dict} />
      <Regions dict={dict} />
      <Specialization dict={dict} />
      <FeaturedEvents events={events} locale={locale} dict={dict} />
      <ContactSection dict={dict} />
    </>
  );
}
