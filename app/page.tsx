import { HeroSection } from '@/components/marketing/hero';
import { HowItWorksSection } from '@/components/marketing/how-it-works';
import { FeaturesGrid } from '@/components/marketing/features-grid';
import { DemoPreviewSection } from '@/components/marketing/demo-preview';
import { TestimonialsSection } from '@/components/marketing/testimonials';
import { PricingSection } from '@/components/marketing/pricing-cards';
import { FaqSection } from '@/components/marketing/faq';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen aurora-bg text-white overflow-x-hidden">
      <MarketingNavbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesGrid />
        <DemoPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <MarketingFooter />
    </div>
  );
}
