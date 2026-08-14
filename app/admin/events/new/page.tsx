import EventForm from '@/components/admin/EventForm';
import uk from '@/lib/i18n/dictionaries/uk';

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-bone-50">
        {uk.admin.newEvent}
      </h1>
      <div className="mt-8 max-w-3xl">
        <EventForm />
      </div>
    </div>
  );
}
