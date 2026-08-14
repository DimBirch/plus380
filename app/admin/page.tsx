import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { EventRecord } from '@/lib/types';
import EventsTable from '@/components/admin/EventsTable';
import SignOutButton from '@/components/admin/SignOutButton';
import uk from '@/lib/i18n/dictionaries/uk';

async function fetchEvents(): Promise<EventRecord[]> {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  if (!configured) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }
  return data ?? [];
}

export default async function AdminDashboardPage() {
  const dict = uk.admin;
  const events = await fetchEvents();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-bone-50">{dict.dashboard}</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/events/new" className="btn-primary !px-5 !py-2.5">
            {dict.addEvent}
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="mt-8">
        <EventsTable initialEvents={events} />
      </div>
    </div>
  );
}
