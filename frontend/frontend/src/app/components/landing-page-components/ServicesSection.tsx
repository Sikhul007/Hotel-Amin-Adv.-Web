// app/components/ServicesSection.tsx
"use client";

import React from "react";
import {
  Plane,
  Car,
  Stethoscope,
  Apple,
  Map,
  ShieldCheck,
  Clock4,
  AlarmClock,
  Utensils,
  Wifi,
  Coffee,
  Snowflake,
  Flame,
  LucideIcon, // Import LucideIcon type for the icon component
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Service {
  icon: LucideIcon; // Type for Lucide icons
  label: string;
}

const servicesData: Service[] = [
  { icon: Plane, label: "Airport Pickup" },
  { icon: Car, label: "Free Parking" },
  { icon: Stethoscope, label: "Doctor on Call" },
  { icon: Apple, label: "Fruits Basket" },
  { icon: Map, label: "Travel Desk" },
  { icon: ShieldCheck, label: "Safe Deposit Box" },
  { icon: Clock4, label: "24h Room Service" },
  { icon: AlarmClock, label: "Open 24 Hours" },
  { icon: Utensils, label: "Restaurant" },
  { icon: Wifi, label: "Wi-Fi Internet" },
  { icon: Coffee, label: "Coffee & Juice Shop" },
  { icon: Snowflake, label: "Mini Fridge" },
  { icon: Flame, label: "Hot Water" },
];

const ServicesSection: React.FC = () => {
  const router = useRouter();
  const handleMakeAReservation = () => {
    router.push("/#check-availability-section");
  };
  return (
    <div className="relative z-10 w-full bg-[#F5F3E9] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] text-center mb-2">
        HOTEL <span className="text-yellow-500">SERVICE</span> AND FACILITIES
      </h2>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-10 sm:mb-14"></div>{" "}
      {/* Underline for the title */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {servicesData.map(
          (
            { icon: Icon, label }: Service,
            idx: number // Explicit types
          ) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-yellow-100 rounded-full p-3 mb-3 shadow-sm">
                {" "}
                {/* Eye-catching icon background */}
                <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-600" />{" "}
                {/* Larger, more vibrant icon color */}
              </div>
              <p className="text-center text-sm sm:text-base font-semibold text-[#0C1F34]">
                {" "}
                {/* Stronger text color */}
                {label}
              </p>
            </div>
          )
        )}
      </div>
      <div className="text-center mt-10 sm:mt-16">
        <button
          onClick={handleMakeAReservation}
          className="bg-green-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-green-700 font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          MAKE A RESERVATION
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
