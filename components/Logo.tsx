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
      <span className={`font-logo leading-none tracking-tight text-bone-50 ${SIZES[size]}`}>
        THR<span className="text-red-500">EEE</span>IGHTY
      </span>
      {showTagline && (
        // `text-center` centres the tagline under the wider THREEEIGHTY wordmark (the
        // flex column stretches both children to the wordmark's width, so the tagline
        // was previously flush left). `pl` mirrors the trailing `tracking` gap, which
        // would otherwise push the visible glyphs ~2px left of true centre — keep the
        // two values equal if the tracking changes.
        <span className="mt-1.5 pl-[0.35em] text-center font-mono text-[0.6rem] font-medium uppercase tracking-[0.35em] text-bone-400">
          Epic Event Experience
        </span>
      )}
    </span>
  );
}
