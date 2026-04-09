"use client";

import { LpHeader } from "@/components/lp/lp-header";
import { LpHero } from "@/components/lp/lp-hero";
import { LpTwoValues } from "@/components/lp/lp-two-values";
import { LpCustomerVoice } from "@/components/lp/lp-customer-voice";
import { LpStorePain } from "@/components/lp/lp-store-pain";
import { LpCapabilities } from "@/components/lp/lp-capabilities";
import { LpStoreTestimonials } from "@/components/lp/lp-store-testimonials";
import { LpPricing } from "@/components/lp/lp-pricing";
import { LpTimeline } from "@/components/lp/lp-timeline";
import { LpCeoMessage } from "@/components/lp/lp-ceo-message";
import { LpFaq } from "@/components/lp/lp-faq";
import { LpContact } from "@/components/lp/lp-contact";
import { LpFooter } from "@/components/lp/lp-footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LpHeader />
      <LpHero />
      <LpTwoValues />
      <LpCustomerVoice />
      <LpStorePain />
      <LpCapabilities />
      <LpStoreTestimonials />
      <LpPricing />
      <LpTimeline />
      <LpCeoMessage />
      <LpFaq />
      <LpContact />
      <LpFooter />
    </div>
  );
}
