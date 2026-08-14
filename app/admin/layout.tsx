import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Admin — THREEEIGHTY',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-white/10 bg-ink-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-bone-400">
              Admin
            </span>
          </Link>
          <Link
            href="/uk"
            target="_blank"
            className="font-mono text-xs uppercase tracking-widest text-bone-500 hover:text-bone-300"
          >
            ↗ Сайт
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
