// Concert-style laser beams fanning down and outward from a few rig
// sources up top — pure CSS (rotated gradient slivers + flicker keyframes
// from globals.css), no client JS needed.

const COLORS = ['#22d3ee', '#67e8f9', '#a78bfa', '#8b5cf6', '#ff5fa2', '#ff2f92'];
const FLICKERS = ['laser-flicker-a', 'laser-flicker-b'];

function makeBeams(count: number, spread: number, seedOffset: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = -spread / 2 + t * spread;
    const seed = Math.sin((i + seedOffset) * 12.9898) * 43758.5453;
    const frac = seed - Math.floor(seed);
    return {
      angle,
      color: COLORS[(i + seedOffset) % COLORS.length],
      flicker: FLICKERS[(i + seedOffset) % FLICKERS.length],
      duration: 2.4 + frac * 3,
      delay: -(frac * 5),
    };
  });
}

const SOURCES = [
  { x: '6%', beams: makeBeams(5, 50, 0) },
  { x: '50%', beams: makeBeams(6, 76, 5) },
  { x: '94%', beams: makeBeams(5, 50, 11) },
];

export default function LaserBeams({ className = '', opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ mixBlendMode: 'screen', opacity }}
    >
      {SOURCES.map((source, si) =>
        source.beams.map((beam, bi) => (
          <div
            key={`${si}-${bi}`}
            className="absolute top-0 w-[3px] origin-top sm:w-[4px]"
            style={{
              left: source.x,
              height: '130%',
              background: `linear-gradient(to bottom, ${beam.color}, transparent 78%)`,
              transform: `rotate(${beam.angle}deg)`,
              filter: 'blur(0.6px)',
              animation: `${beam.flicker} ${beam.duration}s ease-in-out ${beam.delay}s infinite`,
            }}
          />
        ))
      )}
    </div>
  );
}
