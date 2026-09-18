const SIZES = {
  sm: 'text-lg sm:text-xl',
  md: 'text-2xl sm:text-3xl',
  lg: 'text-4xl sm:text-5xl',
  xl: 'text-6xl sm:text-8xl',
};

export default function Logo({
  size = 'md',
  showTagline = false,
  variant = 'full',
  className = '',
}: {
  size?: keyof typeof SIZES;
  showTagline?: boolean;
  variant?: 'full' | 'mark';
  className?: string;
}) {
  if (variant === 'mark') {
    return (
      <span className={`font-logo tracking-tight text-bone-500 ${SIZES[size]} ${className}`}>
        380
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col ${className}`}>
      {/*
        `mr` cancels Anton's trailing negative tracking. `tracking-tight` shortens
        the advance after the final glyph too, so the wordmark's box ends ~1.2px
        inside where the "Y" ink actually stops. Restoring that sliver makes the box
        (which the tagline stretches to) match what the eye reads as the "Y" edge.
        Expressed in em, so it holds at every `size`.
      */}
      <span className={`mr-[0.025em] font-logo leading-none tracking-tight text-bone-50 ${SIZES[size]}`}>
        THR<span className="text-red-500">EEE</span>IGHTY
      </span>
      {showTagline && (
        // The tagline is stretched so it spans the wordmark exactly, from the "T" of
        // THREEEIGHTY to the final "Y". `justify-between` over per-character spans
        // does the stretching: the first glyph sits flush left, the last flush right,
        // and the slack is spread evenly between every character.
        //
        // Plain `text-align: justify` cannot do this — for Latin text it only widens
        // the word spaces, so the two gaps balloon and the letters stay put. Nor is
        // `letter-spacing` used: the flex gaps provide the tracking, and any trailing
        // tracking value would hold the last glyph off the right edge.
        //
        // `ml` + the widened `w` are optical alignment, not padding. JetBrains Mono
        // sets its glyphs ~0.5px inside their advance box (Anton's "T" sits flush),
        // so box-aligned text still reads ~0.5px short on the left and ~0.9px short
        // on the right. Shifting left and widening by the sum of both bearings puts
        // the ink flush with the wordmark's ink. In em, so it survives a font-size
        // change of the tagline.
        //
        // role="img" + aria-label keeps screen readers from spelling the lockup out
        // letter by letter now that each character is its own element.
        <span
          role="img"
          aria-label="Epic Event Experience"
          className="ml-[-0.052em] mt-1.5 flex w-[calc(100%_+_0.104em)] justify-between font-mono text-[0.6rem] font-medium uppercase text-bone-400"
        >
          {'EPIC EVENT EXPERIENCE'.split('').map((char, i) => (
            <span key={i} aria-hidden="true">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
