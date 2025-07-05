import React from "react";

const IntroSection: React.FC = () => {
  return (
    <div className="relative z-10 w-full bg-[#F5F3E9]  py-10 sm:py-16 px-4 sm:px-6 md:px-8 mt-6 sm:mt-10">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start gap-6 sm:gap-10">
        {/* Left Side */}
        <div className="md:w-1/2 text-center">
          <p className="text-blue-700 font-semibold uppercase tracking-wider mb-1 sm:mb-2">
            # Welcome to Hotel{" "}
            <span className="text-yellow-500">Amin International</span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-snug mb-2 sm:mb-4 text-center">
            Embrace <br />
            <span className="text-yellow-500">Comfort in the</span> <br />
            <span className="text-yellow-500">Heart of the City</span>
          </h2>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 text-justify">
          <p className="text-gray-700 leading-relaxed mb-3 sm:mb-6">
            Located in the vibrant core of Dhaka, Hotel Amin International
            offers a serene and stylish escape from the city's hustle. Our hotel
            blends modern sophistication with traditional warmth. Whether you're
            in town for a short stay or an extended visit, you'll experience
            convenience, elegance, and genuine hospitality.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From elegantly designed rooms and suites to thoughtfully curated
            amenities, the hotel features everything you need for a memorable
            stay — including a contemporary well-equipped conference room,
            high-speed Wi-Fi, and personalized concierge services — all tailored
            to elevate your experience at every moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
