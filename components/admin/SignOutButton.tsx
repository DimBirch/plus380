'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import uk from '@/lib/i18n/dictionaries/uk';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest text-bone-300 transition-colors hover:border-flare-500/50 hover:text-flare-400"
    >
      <LogOut size={14} />
      {uk.admin.signOut}
    </button>
  );
}
