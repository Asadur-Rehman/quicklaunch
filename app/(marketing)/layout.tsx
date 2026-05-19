import { MarketingNavbar } from '@/components/marketing/navbar';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen aurora-bg text-white overflow-x-hidden">
      <MarketingNavbar />
      <main>{children}</main>
    </div>
  );
}
