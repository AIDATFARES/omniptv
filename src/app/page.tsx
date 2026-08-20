import HeroSection from "@/components/home/HeroSection";
import Link from "next/link";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

import TopFeatureBar from "@/components/home/TopFeatureBar";
import BrandMarquee from "@/components/home/BrandMarquee";
import MovieStrips from "@/components/home/MovieStrips";
import ChannelCategories from "@/components/home/ChannelCategories";
import DeviceSupport from "@/components/home/DeviceSupport";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import LatestArticlesSection from "@/components/home/LatestArticlesSection";
import SupportCtaSection from "@/components/home/SupportCtaSection";

export default function Home() {
  return (
    <main className="flex-col flex min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Value Proposition & Brand Marquee */}
      <BrandMarquee />
      <TopFeatureBar />
      <MovieStrips />
      <BrandMarquee 
        imagesFolder="dawryate" 
        images={["1235.webp", "1727368362913.webp", "1727368362933.webp", "1727368362971.webp", "ff25.webp"]}
        cardClassName="flex-shrink-0 w-[140px] h-[200px] md:w-[200px] md:h-[280px] relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d0f12] hover:border-[#FF5A2F]/60 transition-all duration-300 group"
        imageClassName="object-cover rounded-xl"
      />

      {/* Channel & Installation Quick Links */}
      <div className="w-full bg-[#050607] py-6 px-4 text-center border-t border-white/5 relative z-20">
        <p className="text-center text-sm md:text-base text-stone-400 max-w-3xl mx-auto">
          Find the comprehensive <Link prefetch={false} className="font-semibold text-[#FF5A2F] hover:text-[#FF6A35]" href="/channels">OmniPtv Channel List</Link> or navigate to our <Link prefetch={false} className="font-semibold text-[#FF5A2F] hover:text-[#FF6A35]" href="/installation">OmniPtv Installation Guide</Link> for a quick start.
        </p>
      </div>

      <PricingSection />
      <ChannelCategories />

      {/* Device Support & How It Works */}
      <DeviceSupport />
      <HowItWorksSection />

      {/* Info & Articles */}
      <FAQSection />
      <LatestArticlesSection />

      {/* Social Proof & Conversion */}
      <TestimonialsSection />
      <SupportCtaSection />
    </main>
  );
}
