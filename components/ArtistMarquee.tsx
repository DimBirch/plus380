const ARTISTS = [
  'The Prodigy',
  'Armin van Buuren',
  'Tiësto',
  'Chemical Brothers',
  'David Guetta',
  'Boris Brejcha',
  'Paul Kalkbrenner',
];

export default function ArtistMarquee() {
  const row = [...ARTISTS, ...ARTISTS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-900 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent sm:w-40" />
      <div className="flex w-max animate-marquee items-center gap-x-10 whitespace-nowrap">
        {row.map((artist, i) => (
          <span key={`${artist}-${i}`} className="flex items-center gap-x-10">
            <span className="font-display text-xl font-medium text-bone-300 sm:text-2xl">
              {artist}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
