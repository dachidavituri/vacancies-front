import React from "react";

import CtaSection from "../components/cta-section";
import Description from "../components/description";
import AboutCarousel from "../components/about-carousel";
const AboutView: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-16 font-serif text-white">
      <Description />
      <AboutCarousel />
      <CtaSection />
    </div>
  );
};

export default AboutView;
