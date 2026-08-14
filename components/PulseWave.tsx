'use client';

import { useEffect, useRef } from 'react';

// A heartbeat-monitor style trace (flat line → spike → flat) that "draws"
// itself in and fades out on a loop, like a pulse blipping across a screen.
export default function PulseWave({
  className = '',
  color = '#a78bfa',
  delay = 0,
  duration = 7,
  width = 260,
}: {
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
  width?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);

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
  }, [duration, delay]);

  return (
    <svg
      viewBox="0 0 300 60"
      width={width}
      height={width / 5}
      aria-hidden="true"
      className={`pointer-events-none overflow-visible ${className}`}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    >
      <path
        ref={pathRef}
        d="M0,30 L38,30 Q48,21 58,30 L78,30 L90,8 L99,54 L108,16 L120,30 L144,30 Q154,15 164,30 Q174,45 184,30 L300,30"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
