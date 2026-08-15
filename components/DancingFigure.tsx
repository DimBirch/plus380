// A bold, Keith-Haring-style dancing silhouette — a real two-beat dance
// step (lean + point one arm + kick the opposite leg, then mirror), not
// independent limbs flailing. All parts share one duration/phase so the
// pose changes in unison (see the dance-* keyframes in globals.css).
export default function DancingFigure({
  className = '',
  color = '#ffffff',
  opacity = 0.06,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const beat = '0.9s';
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
        style={{ animation: `dance-bounce ${beat} ease-in-out infinite`, transformBox: 'fill-box' }}
      >
        {/* torso (head + spine + both arms) leans left/right from the hip */}
        <g style={{ transformOrigin: '146px 206px', animation: `dance-torso ${beat} ease-in-out infinite` }}>
          <circle cx="152" cy="46" r="30" />
          <path d="M152,78 C146,120 140,160 146,206" />
          {/* right arm — points up on the opposite beat from the lean */}
          <g style={{ transformOrigin: '150px 100px', animation: `dance-arm-up ${beat} ease-in-out infinite` }}>
            <path d="M150,100 L95,90 L70,30" />
          </g>
          {/* left arm — mirrors the right arm */}
          <g style={{ transformOrigin: '150px 112px', animation: `dance-arm-down ${beat} ease-in-out infinite` }}>
            <path d="M150,112 L205,105 L225,50" />
          </g>
        </g>
        {/* right leg — kicks out opposite the torso lean */}
        <g style={{ transformOrigin: '146px 206px', animation: `dance-leg-kick ${beat} ease-in-out infinite` }}>
          <path d="M146,206 L92,272 L112,360" />
        </g>
        {/* left leg — mirrors the right leg */}
        <g style={{ transformOrigin: '146px 206px', animation: `dance-leg-plant ${beat} ease-in-out infinite` }}>
          <path d="M146,206 L192,268 L204,368" />
        </g>
      </g>
    </svg>
  );
}
