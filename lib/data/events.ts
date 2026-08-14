import { createClient } from '@/lib/supabase/server';
import type { EventRecord } from '@/lib/types';
import sampleEvents from '@/lib/data/sample-events';

// Supabase isn't wired up yet in this preview — fall back to sample content
// instead of hitting the network so local/demo browsing keeps working.
const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getFeaturedEvents(limit = 6): Promise<EventRecord[]> {
  if (!isSupabaseConfigured) {
    return sampleEvents.filter((e) => e.featured).slice(0, limit);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('featured', true)
    .order('event_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getFeaturedEvents error', error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllEvents(): Promise<EventRecord[]> {
  if (!isSupabaseConfigured) {
    return sampleEvents;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false });

  if (error) {
    console.error('getAllEvents error', error.message);
    return [];
  }
  return data ?? [];
}

export function splitUpcomingPast(events: EventRecord[]) {
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.event_date).getTime() >= now)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  const past = events
    .filter((e) => new Date(e.event_date).getTime() < now)
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());
  return { upcoming, past };
}

export async function getEventBySlug(slug: string): Promise<EventRecord | null> {
  if (!isSupabaseConfigured) {
    return sampleEvents.find((e) => e.slug === slug) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return null;
  }
  return data;
}
