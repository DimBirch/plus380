'use client';

import { useEffect, useRef } from 'react';

// A library of distinct pulse/waveform shapes so instances scattered around
// the site don't all read as the same blip. viewBox is 0 0 300 60, baseline y=30.
const PULSE_VARIANTS = [
  // 0 — classic ECG: P wave, QRS spike, T wave
  'M0,30 L38,30 Q48,21 58,30 L78,30 L90,8 L99,54 L108,16 L120,30 L144,30 Q154,15 164,30 Q174,45 184,30 L300,30',
  // 1 — double heartbeat, two spikes back to back
  'M0,30 L26,30 L36,8 L45,52 L54,16 L64,30 L96,30 L106,8 L115,52 L124,16 L134,30 L300,30',
  // 2 — smooth continuous sine, more musical / synth-wave
  'M0,30 C15,10 30,10 45,30 C60,50 75,50 90,30 C105,10 120,10 135,30 C150,50 165,50 180,30 C195,10 210,10 225,30 C240,50 255,50 270,30 L300,30',
  // 3 — sharp equalizer zigzag burst
  'M0,30 L50,30 L58,44 L66,16 L74,38 L82,22 L90,34 L98,26 L106,30 L300,30',
  // 4 — single dramatic spike, minimal
  'M0,30 L130,30 L142,4 L154,56 L166,30 L300,30',
  // 5 — soft breathing bump then a small blip
  'M0,30 Q40,12 80,30 Q120,48 160,30 L182,30 L190,18 L198,42 L206,30 L300,30',
  // 6 — triple micro-spike burst (like a signal ping cluster)
  'M0,30 L60,30 L68,18 L76,42 L84,30 L96,30 L104,12 L112,48 L120,30 L132,30 L140,22 L148,38 L156,30 L300,30',
];

// A heartbeat-monitor style trace (flat line → spike → flat) that "draws"
// itself in and fades out on a loop, like a pulse blipping across a screen.
export default function PulseWave({
  className = '',
  color = '#a78bfa',
  delay = 0,
  duration = 7,
  width = 260,
  variant = 0,
  flip = false,
}: {
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
  width?: number;
  variant?: number;
  flip?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const d = PULSE_VARIANTS[variant % PULSE_VARIANTS.length];

  useEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== 'function') return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const anim = path.animate(
      [
        { strokeDashoffset: length, opacity: 0 },
        { strokeDashoffset: length, opacity: 1, offset: 0.06 },
        { strokeDashoffset: 0, opacity: 1, offset: 0.46 },
        { strokeDashoffset: 0, opacity: 0, offset: 0.62 },
        { strokeDashoffset: 0, opacity: 0, offset: 1 },
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        easing: 'ease-out',
      }
    );

    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, delay, d]);

  return (
    <svg
      viewBox="0 0 300 60"
      width={width}
      height={width / 5}
      aria-hidden="true"
      className={`pointer-events-none overflow-visible ${className}`}
      style={{
        filter: `drop-shadow(0 0 6px ${color})`,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
