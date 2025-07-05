// app/components/ReviewsSection.tsx
"use client";

import React from "react";
import Image from "next/image"; // Import Image for Next.js optimized images
import { FaStar } from "react-icons/fa"; // Import Star icon from react-icons

interface Review {
  image: string;
  name: string;
  rating: number;
  review: string;
}

const reviewsData: Review[] = [
  {
    image: "/images/person.png",
    name: "John Doe",
    rating: 5,
    review:
      "Hotel Amin International exceeded my expectations! The staff was incredibly friendly and the room was spotless. Highly recommend! The ambiance was serene, and the amenities provided were top-notch. A truly memorable stay.",
  },
  {
    image: "/images/person.png",
    name: "Sarah Malik",
    rating: 4,
    review:
      "Beautiful location, great food, and the pool was clean. Room lighting was awesome! While generally great, a minor improvement in room service speed would make it perfect.",
  },
  {
    image: "/images/person.png", // Added more dummy data for slider visibility
    name: "David Lee",
    rating: 5,
    review:
      "An absolutely fantastic experience. From check-in to check-out, everything was seamless. The staff went above and beyond to ensure our comfort. Will definitely be back!",
  },
  {
    image: "/images/person.png",
    name: "Maria Gonzalez",
    rating: 4,
    review:
      "Very comfortable beds and quiet rooms, which is essential for a good night's sleep. The breakfast buffet was excellent, though it could use a few more vegetarian options.",
  },
  {
    image: "/images/person.png",
    name: "Ali Khan",
    rating: 5,
    review:
      "Perfect for families! Our kids loved the pool, and the hotel arranged a wonderful local tour for us. The family room was spacious and well-maintained.",
  },
];

const ReviewsSection: React.FC = () => {
  // Use a ref for the slider container for better control
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: "smooth" }); // Adjusted scroll amount
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: "smooth" }); // Adjusted scroll amount
    }
  };

  return (
    <div className="relative z-10 w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] text-center mb-2">
        WHAT SAY OUR <span className="text-yellow-500">CUSTOMER</span>
      </h2>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-10 sm:mb-14"></div>{" "}
      {/* Underline */}
      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-[#0C1F34] hover:bg-opacity-90 text-white p-2 sm:p-3 rounded-full shadow-lg z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          aria-label="Scroll left"
        >
          <span className="text-xl sm:text-2xl">◀</span>
        </button>

        <div
          id="room-slider2" // Keep ID if other parts of app rely on it, but prefer ref for direct manipulation
          ref={sliderRef} // Assign ref to the slider div
          className="flex overflow-x-auto space-x-6 sm:space-x-8 scrollbar-hide scroll-smooth px-2 pb-4"
        >
          {reviewsData.map((review: Review, idx: number) => (
            <div
              key={idx}
              className="flex-none w-[280px] sm:w-[350px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col items-center p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-yellow-500 shadow-md"
                />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#0C1F34] mb-2">
                {review.name}
              </h4>
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i: number) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm sm:text-base text-gray-700 italic leading-relaxed">
                “{review.review}”
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-[#0C1F34] hover:bg-opacity-90 text-white p-2 sm:p-3 rounded-full shadow-lg z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          aria-label="Scroll right"
        >
          <span className="text-xl sm:text-2xl">▶</span>
        </button>
      </div>
      <div className="text-center mt-8 sm:mt-12">
        <button className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300 font-semibold text-base sm:text-lg shadow-md">
          VIEW ALL REVIEWS
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
