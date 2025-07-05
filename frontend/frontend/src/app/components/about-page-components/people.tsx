import React from "react";

const People = () => {
  // Define an array of people with their image paths and Facebook links
  const peopleData = [
    {
      src: "/images/amin.jpg", // Updated image path
      alt: "Mohammad Amin",
      name: "Mohammad Amin",
      title: "Managing Director (MD)",
      facebookLink: "https://www.facebook.com/aminiish", // Placeholder link
    },
    {
      src: "/images/nur.jpg", // Updated image path
      alt: "Mohammad Nur",
      name: "Mohammad Nur",
      title: "Deputy Managing Director (DMD) Advisor",
      facebookLink: "https://www.facebook.com/themdnur", // Placeholder link
    },
    {
      src: "/images/sazin.jpg", // Updated image path
      alt: "Mohammad Saiful Islam Sazin",
      name: "Mohammad Saiful Islam Sazin",
      title: "Advisor",
      facebookLink:
        "https://www.facebook.com/mohammad.saiful.islam.sazin.profile", // Placeholder link
    },
    {
      src: "/images/jamal.jpg", // Updated image path
      alt: "Md Ashhab Jamal",
      name: "Md. Ashhab Jamal",
      title: "Front Office Manager",
      facebookLink: "https://www.facebook.com/md.ashhab.jamal.profile", // Placeholder link
    },
    {
      src: "/images/gani.jpg", // Updated image path
      alt: "Md Osman Gani",
      name: "Md Osman Gani",
      title: "Front Office Manager",
      facebookLink: "https://www.facebook.com/md.osman.gani.profile", // Placeholder link
    },
    {
      src: "/images/toaha.jpg", // Updated image path
      alt: "Mohammad Toaha",
      name: "Mohammad Toaha",
      title: "Front Office Manager",
      facebookLink: "https://www.facebook.com/mohammad.toaha.profile", // Placeholder link
    },
  ];

  return (
    // Changed the background from bg-base-300 to bg-white
    <div className="bg-white p-4 text-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        EXPERT PEOPLES BEHIND THE HOTEL AMIN INTERNATIONAL
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {peopleData.map((person, index) => (
          // Added a link (a tag) to wrap the entire person card for clickability
          // Added transform and transition for hover effect
          <a
            key={index}
            href={person.facebookLink}
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            className="block bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            {/* Aspect ratio container for perfect square pictures */}
            <div className="w-full pt-[100%] relative overflow-hidden rounded-t-lg">
              <img
                src={person.src}
                alt={person.alt}
                // object-cover to ensure images fill the space without distortion, object-top for head focus
                className="absolute top-0 left-0 w-full h-full object-cover object-top"
                // Fallback for broken images, ensure these paths are correct in your public directory
                // onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/CCCCCC/000000?text=Image%20Error"; }}
              />
            </div>
            <p className="text-black text-lg font-semibold mt-2">
              {person.name}
            </p>
            <p className="text-gray-600">{person.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default People;
