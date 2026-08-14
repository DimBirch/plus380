export type EventCategory =
  | 'festival'
  | 'concert'
  | 'tour'
  | 'club'
  | 'corporate'
  | 'other';

export interface EventRecord {
  id: string;
  slug: string;
  title_uk: string;
  title_en: string;
  description_uk: string | null;
  description_en: string | null;
  event_date: string; // ISO timestamp
  venue: string | null;
  city: string | null;
  country: string | null;
  category: EventCategory;
  cover_image_url: string | null;
  gallery_images: string[] | null;
  ticket_url: string | null;
  attendees_count: number | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type EventInput = Omit<EventRecord, 'id' | 'created_at' | 'updated_at'>;
