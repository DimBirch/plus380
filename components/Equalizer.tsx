// A field of thin, tall equalizer bars that bounce at slightly different
// speeds/patterns so the whole strip reads as chaotic, not synchronized.
// Pure CSS animation (see globals.css eq-a..d keyframes) — no client JS needed.

const COLORS = ['#a78bfa', '#8b5cf6', '#22d3ee', '#67e8f9', '#ff5fa2', '#ff2f92', '#d4ff3f'];
const PATTERNS = ['eq-a', 'eq-b', 'eq-c', 'eq-d'];

export default function Equalizer({
  className = '',
  barCount = 90,
  opacity = 0.55,
}: {
  className?: string;
  barCount?: number;
  opacity?: number;
}) {
  const bars = Array.from({ length: barCount }, (_, i) => {
    // Deterministic pseudo-randomness from the index, so server and client
    // render identically (no hydration mismatch) while still looking varied.
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const frac = seed - Math.floor(seed);
    const duration = 0.8 + frac * 1.6; // 0.8s – 2.4s
    const delay = -((i * 0.37) % duration); // negative delay desyncs start position
    return {
      color: COLORS[i % COLORS.length],
      pattern: PATTERNS[i % PATTERNS.length],
      duration,
      delay,
    };
  });

  return (
    <div className={`flex items-end justify-between ${className}`} style={{ opacity }}>
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-[2px] rounded-t-full sm:w-[3px]"
          style={{
            height: '100%',
            backgroundColor: bar.color,
            transformOrigin: 'bottom',
            animation: `${bar.pattern} ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
