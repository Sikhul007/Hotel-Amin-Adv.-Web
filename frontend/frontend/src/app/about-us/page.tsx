import React from "react";
import AboutTop from "@/app/components/about-page-components/abouttop";
import People from "@/app/components/about-page-components/people";

export default function Home() {
  return (
    <div>
      <AboutTop />
      <People />

      <main className="container mx-auto p-4"></main>
    </div>
  );
}
