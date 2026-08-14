import type { EventCategory } from '@/lib/types';

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    home: string;
    events: string;
    about: string;
    contact: string;
    bookUs: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  stats: {
    heading: string;
    years: { value: string; label: string };
    festival: { value: string; label: string };
    artists: { value: string; label: string };
    regions: { value: string; label: string };
  };
  marquee: { heading: string };
  credibility: {
    eyebrow: string;
    heading: string;
    body: string;
    values: { title: string; text: string }[];
  };
  regions: {
    eyebrow: string;
    heading: string;
    body: string;
    list: { name: string; note: string }[];
  };
  specialization: {
    eyebrow: string;
    heading: string;
    body: string;
    tags: string[];
  };
  gallery: {
    eyebrow: string;
    heading: string;
    body: string;
    upcoming: string;
    past: string;
    all: string;
    viewAll: string;
    empty: string;
    loading: string;
    ticketCta: string;
    dateLabel: string;
    venueLabel: string;
    categoryLabel: string;
    attendeesLabel: string;
    backToEvents: string;
    gallerySection: string;
  };
  categories: Record<EventCategory, string>;
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
    locationHq: string;
    locationTagline: string;
    officesLabel: string;
    hqBadge: string;
    comingSoonBadge: string;
    offices: { city: string; country: string; hq?: boolean; comingSoon?: boolean }[];
  };
  footer: {
    tagline: string;
    rights: string;
    admin: string;
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    email: string;
    password: string;
    signIn: string;
    signOut: string;
    error: string;
    dashboard: string;
    addEvent: string;
    editEvent: string;
    newEvent: string;
    save: string;
    cancel: string;
    delete: string;
    confirmDelete: string;
    fields: {
      titleUk: string;
      titleEn: string;
      descriptionUk: string;
      descriptionEn: string;
      date: string;
      venue: string;
      city: string;
      country: string;
      category: string;
      ticketUrl: string;
      attendees: string;
      featured: string;
      coverImage: string;
      galleryImages: string;
      slug: string;
    };
    noEvents: string;
    saved: string;
    uploading: string;
  };
}
