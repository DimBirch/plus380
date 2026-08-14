-- +380 — database schema
-- Run this once in your Supabase project's SQL editor (Database → SQL Editor → New query).

create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_uk text not null,
  title_en text not null,
  description_uk text,
  description_en text,
  event_date timestamptz not null,
  venue text,
  city text,
  country text,
  category text not null default 'other'
    check (category in ('festival', 'concert', 'tour', 'club', 'corporate', 'other')),
  cover_image_url text,
  gallery_images text[] default '{}',
  ticket_url text,
  attendees_count integer,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_event_date_idx on public.events (event_date desc);
create index if not exists events_featured_idx on public.events (featured);

-- Keep updated_at fresh on every write
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- Row Level Security: anyone can read, only signed-in admins can write.
alter table public.events enable row level security;

drop policy if exists "Public read access" on public.events;
create policy "Public read access"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated insert" on public.events;
create policy "Authenticated insert"
  on public.events for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update" on public.events;
create policy "Authenticated update"
  on public.events for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete" on public.events;
create policy "Authenticated delete"
  on public.events for delete
  to authenticated
  using (true);

-- Storage bucket for event cover + gallery photos.
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read event images" on storage.objects;
create policy "Public read event images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'event-images');

drop policy if exists "Authenticated upload event images" on storage.objects;
create policy "Authenticated upload event images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'event-images');

drop policy if exists "Authenticated update event images" on storage.objects;
create policy "Authenticated update event images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'event-images');

drop policy if exists "Authenticated delete event images" on storage.objects;
create policy "Authenticated delete event images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'event-images');
