// app/gallery/page.tsx
"use client";

import React, { useState } from "react";
import TopLine from "@/app/components/gallery-page-componnets/topline";
import TopMiddle from "@/app/components/gallery-page-componnets/topmiddle";
import Pic from "@/app/components/gallery-page-componnets/pic";
import Dining from "@/app/components/gallery-page-componnets/Dining";
import Middle from "@/app/components/gallery-page-componnets/middle";

const LobbyGallery: React.FC = () => (
  <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
    <h3 className="text-2xl font-bold text-blue-700 mb-4">Lobby Gallery</h3>
    <p className="text-gray-700">
      Images of our elegant hotel lobby will go here.
    </p>

    {/* Local Images from public/images/ */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      <img
        src="/images/event_1.jpg"
        alt="Lobby Image 1"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
      <img
        src="/images/pic2.jpg"
        alt="Lobby Image 2"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
      <img
        src="/images/pic3.jpg"
        alt="Lobby Image 3"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
    </div>
  </div>
);

const PoolSpaGallery: React.FC = () => (
  <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
    <h3 className="text-2xl font-bold text-blue-700 mb-4">Lobby Gallery</h3>
    <p className="text-gray-700">
      Images of our elegant hotel lobby will go here.
    </p>

    {/* Local Images from public/images/ */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      <img
        src="/images/spa_1.jpg"
        alt="Lobby Image 1"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
      <img
        src="/images/spa_2.jpg"
        alt="Lobby Image 2"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
    </div>
  </div>
);

const EventsGallery: React.FC = () => (
  <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
    <h3 className="text-2xl font-bold text-blue-700 mb-4">Lobby Gallery</h3>

    {/* Local Images from public/images/ */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      <img
        src="/images/event_1.jpg"
        alt="Lobby Image 1"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
      <img
        src="/images/event_2.jpg"
        alt="Lobby Image 2"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
      <img
        src="/images/event_3.jpg"
        alt="Lobby Image 3"
        className="rounded-lg h-48 w-full object-cover shadow"
      />
    </div>
  </div>
);

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all"); // Default to "all"

  return (
    <div>
      <TopLine />
      {/* Pass activeCategory and setActiveCategory to TopMiddle */}
      <TopMiddle
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {/* <Middle /> Commented out as its purpose unclear with new category filtering */}
      <main className="container mx-auto p-4 py-8">
        {/* Conditional Rendering based on activeCategory */}
        {/* All Rooms Gallery */}
        {activeCategory === "all" && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1F34] mb-8">
              Our <span className="text-yellow-500">Rooms</span>
            </h2>
            <Pic /> {/* This is your Rooms gallery component */}
          </section>
        )}
        {activeCategory === "rooms" && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1F34] mb-8">
              Our <span className="text-yellow-500">Rooms</span>
            </h2>
            <Pic /> {/* This is your Rooms gallery component */}
          </section>
        )}
        {/* Dining Gallery */}
        {activeCategory === "dining" && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1F34] mb-8">
              Our <span className="text-yellow-500">Dining Experience</span>
            </h2>
            <Dining /> {/* This is your Dining gallery component */}
          </section>
        )}
        {/* Lobby Gallery */}
        {activeCategory === "lobby" && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1F34] mb-8">
              Hotel <span className="text-blue-500">Lobby</span>
            </h2>
            <LobbyGallery /> {/* Placeholder for Lobby content */}
          </section>
        )}
        {/* Pool/Spa Gallery */}
        {activeCategory === "pool-spa" && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1F34] mb-8">
              <span className="text-green-500">Pool & Spa</span> Facilities
            </h2>
            <PoolSpaGallery /> {/* Placeholder for Pool/Spa content */}
          </section>
        )}
        {/* Events Gallery */}
        {activeCategory === "events" && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1F34] mb-8">
              Special <span className="text-purple-500">Events</span>
            </h2>
            <EventsGallery /> {/* Placeholder for Events content */}
          </section>
        )}
      </main>
    </div>
  );
}
