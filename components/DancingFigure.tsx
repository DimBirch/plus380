// A bold, Keith-Haring-style dancing silhouette — thick rounded strokes,
// no anatomy detail needed. Used as a big, subtle background watermark.
export default function DancingFigure({
  className = '',
  color = '#ffffff',
  opacity = 0.06,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 300 420"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <g fill="none" stroke={color} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round">
        {/* head */}
        <circle cx="152" cy="46" r="30" />
        {/* spine */}
        <path d="M152,78 C146,120 140,160 146,206" />
        {/* raised arm */}
        <path d="M150,100 L88,58 L46,14" />
        {/* lower arm */}
        <path d="M150,112 L214,140 L256,96" />
        {/* kicked-out leg */}
        <path d="M146,206 L92,272 L112,360" />
        {/* planted leg */}
        <path d="M146,206 L192,268 L204,368" />
      </g>
    </svg>
  );
}
