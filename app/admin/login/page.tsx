'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import uk from '@/lib/i18n/dictionaries/uk';

export default function AdminLoginPage() {
  const dict = uk.admin;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(dict.error);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="glass-panel w-full max-w-sm p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 text-red-400">
          <Lock size={18} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-bone-50">{dict.loginTitle}</h1>
        <p className="mt-1 font-body text-sm text-bone-400">{dict.loginSubtitle}</p>

        {!configured && (
          <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 p-3 font-body text-xs leading-relaxed text-red-400">
            Supabase ще не підключено (немає NEXT_PUBLIC_SUPABASE_URL /
            NEXT_PUBLIC_SUPABASE_ANON_KEY). Вхід буде недоступний, доки не заповните .env.local —
            дивіться README.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
              {dict.email}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-body text-sm text-bone-50 outline-none focus:border-red-500/60"
              placeholder="you@threeeighty.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
              {dict.password}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-body text-sm text-bone-50 outline-none focus:border-red-500/60"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="font-body text-xs text-red-400">{error}</p>}

          <button type="submit" disabled={loading || !configured} className="btn-primary mt-2 disabled:opacity-40">
            {loading ? '…' : dict.signIn}
          </button>
        </form>
      </div>
    </div>
  );
}
