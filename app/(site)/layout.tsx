import en from '@/lib/i18n/dictionaries/en';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header dict={en} />
      <main>{children}</main>
      <Footer dict={en} />
    </div>
  );
}
