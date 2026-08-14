import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EventForm from '@/components/admin/EventForm';
import uk from '@/lib/i18n/dictionaries/uk';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  if (!configured) notFound();

  const supabase = createClient();
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!event) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-bone-50">
        {uk.admin.editEvent}
      </h1>
      <div className="mt-8 max-w-3xl">
        <EventForm event={event} />
      </div>
    </div>
  );
}
