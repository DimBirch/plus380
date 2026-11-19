'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// Default theme is dark. Light is the opt-in: it sets data-theme="light".
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-bone-300 transition-colors hover:border-lime-400/60 hover:text-lime-400 ${className}`}
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
