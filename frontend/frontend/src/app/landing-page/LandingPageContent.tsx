"use client";

import React from "react";
import HeroSection from "@/app/components/landing-page-components/HeroSection";
import CheckRoomAvailabilitySection from "@/app/components/landing-page-components/CheckRoomAvailabilitySection";
import IntroSection from "@/app/components/landing-page-components/IntroSection";
import RoomsSection from "@/app/components/landing-page-components/RoomsSection";
import ServicesSection from "@/app/components/landing-page-components/ServicesSection";
import ReviewsSection from "@/app/components/landing-page-components/ReviewsSection";
import LocationVideoSection from "@/app/components/landing-page-components/LocationVideoSection";
import ContactUsSection from "@/app/components/landing-page-components/ContactUsSection";

const LandingPageContent: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <HeroSection />
      <IntroSection />
      <RoomsSection />
      <ServicesSection />
      <ReviewsSection />
      <LocationVideoSection />
      <div id="check-availability-section">
        <CheckRoomAvailabilitySection />
      </div>
      <ContactUsSection />
    </div>
  );
};

export default LandingPageContent;
