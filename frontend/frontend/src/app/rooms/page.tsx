// app/rooms/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import RoomSelectionSection from "@/app/components/booking-page-components/RoomSelectionSection";
const RoomsPage: React.FC = () => {
  const searchParams = useSearchParams();

  const checkInDate = searchParams.get("checkIn") || undefined;
  const checkOutDate = searchParams.get("checkOut") || undefined;
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");

  return (
    <>
      <RoomSelectionSection
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        adults={adults}
      />
    </>
  );
};

export default RoomsPage;
