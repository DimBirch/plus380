'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, ShieldCheck, TriangleAlert } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import uk from '@/lib/i18n/dictionaries/uk';

export default function AdminResetPasswordPage() {
  const dict = uk.admin;
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const supabase = createClient();
      const url = new URL(window.location.href);

      // Supabase appends error_description when the link is expired or already used.
      if (url.searchParams.get('error_description')) {
        if (!cancelled) {
          setHasRecoverySession(false);
          setChecking(false);
        }
        return;
      }

      // The browser client has detectSessionInUrl on, so it may have exchanged
      // the ?code= itself already. Check for a session first and only fall back
      // to exchanging manually — exchanging a code twice fails.
      let { data } = await supabase.auth.getSession();
      let ok = Boolean(data.session);

      const code = url.searchParams.get('code');
      if (!ok && code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        ok = !exchangeError;
      }

      // Last resort: the automatic exchange can still be in flight.
      if (!ok) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        ({ data } = await supabase.auth.getSession());
        ok = Boolean(data.session);
      }

      if (ok) {
        // Drop the one-time code from the address bar and from history.
        window.history.replaceState({}, '', url.pathname);
      }
      if (!cancelled) {
        setHasRecoverySession(ok);
        setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError(dict.resetMismatch);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    router.refresh();
    setTimeout(() => router.push('/admin'), 1200);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="glass-panel w-full max-w-sm p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 text-red-400">
          {done ? <ShieldCheck size={18} /> : hasRecoverySession ? <KeyRound size={18} /> : <TriangleAlert size={18} />}
        </div>

        <h1 className="font-display text-2xl font-semibold text-bone-50">{dict.resetTitle}</h1>

        {checking && <p className="mt-1 font-body text-sm text-bone-400">…</p>}

        {!checking && !hasRecoverySession && (
          <>
            <p className="mt-1 font-body text-sm leading-relaxed text-bone-400">
              {dict.resetLinkInvalid}
            </p>
            <Link href="/admin/forgot-password" className="btn-primary mt-6">
              {dict.sendResetLink}
            </Link>
          </>
        )}

        {!checking && hasRecoverySession && done && (
          <p className="mt-1 font-body text-sm text-bone-400">{dict.resetDone}</p>
        )}

        {!checking && hasRecoverySession && !done && (
          <>
            <p className="mt-1 font-body text-sm text-bone-400">{dict.resetSubtitle}</p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
                  {dict.newPassword}
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-body text-sm text-bone-50 outline-none focus:border-red-500/60"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
                  {dict.confirmPassword}
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-body text-sm text-bone-50 outline-none focus:border-red-500/60"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="font-body text-xs text-red-400">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-40">
                {loading ? '…' : dict.resetSubmit}
              </button>
            </form>
          </>
        )}

        <Link
          href="/admin/login"
          className="mt-6 inline-flex items-center gap-2 font-body text-xs text-bone-500 transition-colors hover:text-bone-50"
        >
          {dict.backToLogin}
        </Link>
      </div>
    </div>
  );
}
