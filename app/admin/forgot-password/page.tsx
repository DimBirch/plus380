'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ArrowLeft, MailCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import uk from '@/lib/i18n/dictionaries/uk';

export default function AdminForgotPasswordPage() {
  const dict = uk.admin;
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    // redirectTo must be listed under Authentication → URL Configuration →
    // Redirect URLs in Supabase, otherwise Supabase silently falls back to the
    // project's Site URL and the emailed link lands somewhere else entirely.
    await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    // Deliberately shown whether or not the address exists — Supabase does not
    // error on unknown emails either, and reporting the difference here would
    // turn this page into a way to probe which addresses have accounts.
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="glass-panel w-full max-w-sm p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-lime-500/15 text-lime-400">
          {sent ? <MailCheck size={18} /> : <KeyRound size={18} />}
        </div>

        <h1 className="font-display text-2xl font-semibold text-bone-50">{dict.forgotTitle}</h1>
        <p className="mt-1 font-body text-sm text-bone-400">
          {sent ? dict.forgotSent : dict.forgotSubtitle}
        </p>

        {!configured && (
          <p className="mt-5 rounded-lg border border-lime-500/40 bg-lime-500/10 p-3 font-body text-xs leading-relaxed text-lime-400">
            Supabase ще не підключено (немає NEXT_PUBLIC_SUPABASE_URL /
            NEXT_PUBLIC_SUPABASE_ANON_KEY). Відновлення буде недоступне, доки не заповните
            .env.local — дивіться README.
          </p>
        )}

        {!sent && (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-500">
                {dict.email}
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-body text-sm text-bone-50 outline-none focus:border-lime-500/60"
                placeholder="you@threeeighty.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !configured}
              className="btn-primary mt-2 disabled:opacity-40"
            >
              {loading ? dict.sending : dict.sendResetLink}
            </button>
          </form>
        )}

        <Link
          href="/admin/login"
          className="mt-6 inline-flex items-center gap-2 font-body text-xs text-bone-500 transition-colors hover:text-bone-50"
        >
          <ArrowLeft size={13} />
          {dict.backToLogin}
        </Link>
      </div>
    </div>
  );
}
