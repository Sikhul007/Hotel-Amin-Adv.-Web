// app/components/LocationVideoSection.tsx
"use client";

import React from "react";

const LocationVideoSection: React.FC = () => {
  return (
    <div className="relative z-10 w-full bg-[#F5F3E9] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] text-center mb-2">
        FIND US & TAKE A <span className="text-yellow-500">TOUR</span>
      </h2>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-10 sm:mb-14"></div>{" "}
      {/* Underline */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {/* Google Map */}
        <div className="w-full relative overflow-hidden rounded-xl shadow-xl border border-gray-200 group transform hover:scale-[1.01] transition-transform duration-300">
          {/* Aspect ratio box for responsive iframe height */}
          <div className="relative pt-[56.25%]">
            {" "}
            {/* 16:9 Aspect Ratio (height / width * 100) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.3560903673642!2d91.98158117587977!3d21.4152441743909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc880978c261d%3A0x11b5011f520a56b8!2sHotel%20Amin%20International!5e0!3m2!1sen!2sbd!4v1751040269421!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              title="Hotel Amin International Location Map"
            ></iframe>
          </div>
          {/* Optional overlay for hover effect or title */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4 text-white font-bold text-lg pointer-events-none">
            Google Map
          </div>
        </div>

        {/* Video */}
        <div className="w-full relative overflow-hidden rounded-xl shadow-xl border border-gray-200 group transform hover:scale-[1.01] transition-transform duration-300">
          {/* Aspect ratio box for responsive iframe height */}
          <div className="relative pt-[56.25%]">
            {" "}
            {/* 16:9 Aspect Ratio */}
            <video
              width="100%"
              height="100%"
              src="/videos/location.mp4"
              title="Hotel Tour Video"
              // mute video for autoplay
              muted
              autoPlay
              playsInline
              className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
            ></video>
          </div>
          {/* Optional overlay for hover effect or title */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4 text-white font-bold text-lg pointer-events-none">
            Hotel Tour Video
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationVideoSection;
