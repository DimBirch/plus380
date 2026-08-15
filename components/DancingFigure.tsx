// A bold, Keith-Haring-style dancing silhouette — thick rounded strokes,
// no anatomy detail needed. Each limb is its own group rotating around its
// joint (CSS keyframes in globals.css), so the figure actually dances.
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
      <g
        fill="none"
        stroke={color}
        strokeWidth={22}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          animation: 'dance-bounce 0.6s ease-in-out infinite',
          transformBox: 'fill-box',
        }}
      >
        {/* head */}
        <circle cx="152" cy="46" r="30" />
        {/* spine */}
        <path d="M152,78 C146,120 140,160 146,206" />
        {/* raised arm — rotates around the shoulder */}
        <g style={{ transformOrigin: '150px 100px', animation: 'dance-arm-up 0.5s ease-in-out infinite' }}>
          <path d="M150,100 L88,58 L46,14" />
        </g>
        {/* lower arm — rotates around the shoulder, own timing */}
        <g style={{ transformOrigin: '150px 112px', animation: 'dance-arm-down 0.62s ease-in-out infinite' }}>
          <path d="M150,112 L214,140 L256,96" />
        </g>
        {/* kicked-out leg — rotates around the hip */}
        <g style={{ transformOrigin: '146px 206px', animation: 'dance-leg-kick 0.48s ease-in-out infinite' }}>
          <path d="M146,206 L92,272 L112,360" />
        </g>
        {/* planted leg — rotates around the hip, own timing */}
        <g style={{ transformOrigin: '146px 206px', animation: 'dance-leg-plant 0.56s ease-in-out infinite' }}>
          <path d="M146,206 L192,268 L204,368" />
        </g>
      </g>
    </svg>
  );
}
