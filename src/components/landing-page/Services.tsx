// OurServices.tsx
import React from "react";
import EmblaCarousel from "./embla";

// Example slides with logoSrc and title for each slide
const slidesData = [
  { logoSrc: "/cards/social.svg", title: "Centralized Socials" },
  { logoSrc: "/cards/form.svg", title: "Form Creation" },
  { logoSrc: "/cards/crm.svg", title: "CRM" },
  { logoSrc: "/cards/schedule.svg", title: "Schedule Ads & Posts" },
  { logoSrc: "/cards/insights.svg", title: "Business Insights" },
  { logoSrc: "/cards/magic.svg", title: "AI Powered Content" },
  { logoSrc: "/cards/graphics.svg", title: "Poster Generation"},
];

const OurServices: React.FC = () => {
  return (
    <div className="py-[130px] bg-[#F7F7F7]">
      <h2 className="text-[#35024D] text-[49px] mt-[100] font-urbanist font-bold text-center">
        Our Services
      </h2>
      <p className="text-[#374151] text-[27px] font-urbanist text-center mt-0 px-4 max-w-3xl mx-auto">
        Providing simple, effective solutions to grow your business
      </p>

      <EmblaCarousel slides={slidesData}/>
    </div>
  );
};

export default OurServices;
