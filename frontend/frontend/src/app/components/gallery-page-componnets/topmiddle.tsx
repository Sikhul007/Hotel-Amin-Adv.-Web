// components/gallery-page-componnets/TopMiddle.tsx
"use client";

import React from "react";

interface TopMiddleProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { name: "All", value: "all" },
  { name: "Rooms", value: "rooms" },
  { name: "Dining", value: "dining" },
  { name: "Lobby", value: "lobby" },
  { name: "Pool & Spa", value: "pool-spa" },
  { name: "Events", value: "events" },
];

const TopMiddle: React.FC<TopMiddleProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const primaryDark = "#0C1F34"; // Consistent with your theme
  const accentYellow = "#F59E0B"; // Consistent with your theme

  return (
    <div className="bg-gray-100 py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-[#0C1F34]">
          Explore Our <span style={{ color: accentYellow }}>Galleries</span>
        </h2>
        <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`
                px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ease-in-out
                shadow-md hover:shadow-lg
                ${
                  activeCategory === category.value
                    ? `bg-[${primaryDark}] text-white ring-2 ring-[${accentYellow}] scale-105` // Active state
                    : `bg-white text-gray-700 hover:bg-gray-100 hover:text-[${primaryDark}] border border-gray-300` // Inactive state
                }
              `}
              style={
                activeCategory === category.value
                  ? {
                      backgroundColor: primaryDark,
                      color: "white",
                      borderColor: accentYellow,
                    }
                  : {}
              } // Inline style for dynamic colors
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TopMiddle;
