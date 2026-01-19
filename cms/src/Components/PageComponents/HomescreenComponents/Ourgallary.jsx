import React from "react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    title: "Central Library",
  },
  {
    src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0",
    title: "Research Laboratories",
  },
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    title: "Smart Classrooms",
  },
  {
    src: "https://images.unsplash.com/photo-1562774053-701939374585",
    title: "Campus View",
  },
  {
    src: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    title: "Sports Facilities",
  },
  {
    src: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e",
    title: "Transportation",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    title: "Student Activities",
  },
  
];

const Ourgallary = () => {
  return (
    <section className="bg-[#2f3834]/10 min-h-screen px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-black">
          Campus Gallery
        </h1>
        <div className="w-24 h-[2px] bg-gray-900 mx-auto my-6"></div>
        <p className="text-gray-800 text-lg leading-relaxed">
          A glimpse into our vibrant academic environment, modern facilities,
          and campus life.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-6">
        {/* Large Highlight */}
        <div className="lg:col-span-2 lg:row-span-2 relative group rounded-xl overflow-hidden">
          <img
            src={galleryImages[0].src}
            alt={galleryImages[0].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-6">
            <h3 className="text-white text-xl font-semibold">
              {galleryImages[0].title}
            </h3>
          </div>
        </div>

        {/* Medium Tiles */}
        {galleryImages.slice(1, 5).map((item, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-4">
              <h3 className="text-white text-sm font-medium">
                {item.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Wide Tile */}
        <div className="sm:col-span-2 relative group rounded-xl overflow-hidden">
          <img
            src={galleryImages[5].src}
            alt={galleryImages[5].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-6">
            <h3 className="text-white text-lg font-semibold">
              {galleryImages[5].title}
            </h3>
          </div>
        </div>

        {/* Small Tile */}
        <div className="relative group rounded-xl overflow-hidden">
          <img
            src={galleryImages[6].src}
            alt={galleryImages[6].title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-4">
            <h3 className="text-white text-sm font-medium">
              {galleryImages[6].title}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourgallary;
