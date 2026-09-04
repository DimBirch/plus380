'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { EventCategory, EventRecord } from '@/lib/types';
import uk from '@/lib/i18n/dictionaries/uk';

const CATEGORIES: EventCategory[] = ['festival', 'concert', 'tour', 'club', 'corporate', 'other'];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9а-яіїєґ]+/gi, '-')
    .replace(/(^-|-$)/g, '');
}

function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

export default function EventForm({ event }: { event?: EventRecord }) {
  const dict = uk.admin;
  const router = useRouter();
  const isEdit = Boolean(event);

  const [title, setTitle] = useState(event?.title_en ?? '');
  const [slug, setSlug] = useState(event?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(event?.slug));
  const [description, setDescription] = useState(event?.description_en ?? '');
  const [eventDate, setEventDate] = useState(
    event ? toDatetimeLocal(event.event_date) : ''
  );
  const [venue, setVenue] = useState(event?.venue ?? '');
  const [city, setCity] = useState(event?.city ?? '');
  const [country, setCountry] = useState(event?.country ?? '');
  const [category, setCategory] = useState<EventCategory>(event?.category ?? 'concert');
  const [ticketUrl, setTicketUrl] = useState(event?.ticket_url ?? '');
  const [attendees, setAttendees] = useState(
    event?.attendees_count != null ? String(event.attendees_count) : ''
  );
  const [featured, setFeatured] = useState(event?.featured ?? false);
  const [coverUrl, setCoverUrl] = useState(event?.cover_image_url ?? '');
  const [galleryUrls, setGalleryUrls] = useState<string[]>(event?.gallery_images ?? []);

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function uploadFile(file: File) {
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('event-images').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('event-images').getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadFile(file);
      setCoverUrl(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      setGalleryUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setUploadingGallery(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const supabase = createClient();
    const payload = {
      slug: slug || slugify(title),
      // The public site is English-only, but the database still has
      // separate uk/en columns (kept NOT NULL to avoid a migration) — mirror
      // the same value into both so old constraints stay satisfied.
      title_uk: title,
      title_en: title,
      description_uk: description || null,
      description_en: description || null,
      event_date: new Date(eventDate).toISOString(),
      venue: venue || null,
      city: city || null,
      country: country || null,
      category,
      cover_image_url: coverUrl || null,
      gallery_images: galleryUrls,
      ticket_url: ticketUrl || null,
      attendees_count: attendees ? Number(attendees) : null,
      featured,
    };

    const query = isEdit
      ? supabase.from('events').update(payload).eq('id', event!.id)
      : supabase.from('events').insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  const inputClass =
    'w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-body text-sm text-bone-50 outline-none focus:border-red-500/60';
  const labelClass = 'mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-500';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 font-body text-xs text-red-400">
          {error}
        </p>
      )}

      <div>
        <label className={labelClass}>{dict.fields.title}</label>
        <input
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>{dict.fields.slug}</label>
        <input
          required
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>{dict.fields.description}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClass}>{dict.fields.date}</label>
          <input
            required
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{dict.fields.category}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {uk.categories[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{dict.fields.attendees}</label>
          <input
            type="number"
            min={0}
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClass}>{dict.fields.venue}</label>
          <input value={venue} onChange={(e) => setVenue(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{dict.fields.city}</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{dict.fields.country}</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{dict.fields.ticketUrl}</label>
        <input
          value={ticketUrl}
          onChange={(e) => setTicketUrl(e.target.value)}
          className={inputClass}
          placeholder="https://"
        />
      </div>

      <label className="flex w-max items-center gap-2.5 font-body text-sm text-bone-300">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-red-500"
        />
        {dict.fields.featured}
      </label>

      <div>
        <label className={labelClass}>{dict.fields.coverImage}</label>
        <div className="flex items-center gap-4">
          {coverUrl && (
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10">
              <Image src={coverUrl} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setCoverUrl('')}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-950/80 text-bone-50"
              >
                <X size={11} />
              </button>
            </div>
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 font-mono text-xs uppercase tracking-widest text-bone-400 hover:border-red-500/50 hover:text-red-300">
            {uploadingCover ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            {uploadingCover ? dict.uploading : 'Завантажити'}
            <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
          </label>
        </div>
      </div>

      <div>
        <label className={labelClass}>{dict.fields.galleryImages}</label>
        <div className="flex flex-wrap items-center gap-3">
          {galleryUrls.map((url, i) => (
            <div key={url + i} className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10">
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setGalleryUrls((prev) => prev.filter((u) => u !== url))}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-950/80 text-bone-50"
              >
                <X size={11} />
              </button>
            </div>
          ))}
          <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/20 font-mono text-[0.6rem] uppercase tracking-widest text-bone-400 hover:border-red-500/50 hover:text-red-300">
            {uploadingGallery ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            +
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-40">
          {saving ? '…' : dict.save}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="btn-secondary"
        >
          {dict.cancel}
        </button>
      </div>
    </form>
  );
}
