import React, { useState } from 'react';
import { FaGripLinesVertical } from "react-icons/fa";

const Campus = () => {
  const [active, setActive] = useState(
    "https://zolostays.com/blog/wp-content/uploads/2024/02/acharya-institute-of-technology-bangalore.jpg"
  );

  const data = [
    { imgelink: "https://zolostays.com/blog/wp-content/uploads/2024/02/acharya-institute-of-technology-bangalore.jpg" },
    { imgelink: "https://www.mbacollegesbangalore.in/wp-content/uploads/2017/08/Acharya-Institute-of-Technology-2.jpg" },
    { imgelink: "https://i.pinimg.com/736x/16/d8/f1/16d8f110b0cab10e274ffe24050594c3.jpg" },
    { imgelink: "https://www.mbacollegesbangalore.in/wp-content/uploads/2017/08/Acharya-Institute-of-Technology-2.jpg" },
    { imgelink: "https://lh3.googleusercontent.com/-gNnLnOosol0/WCI6r8n3nKI/AAAAAAAAABo/1I79pk_bkXItZyjNIBg8_lJbn5t5ApYhgCLIB/photo.jpg" },
  ];

  return (
    <div className="bg-gray-100 rounded-b-3xl py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-start">
        
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4 flex items-center text-gray-900">
            <FaGripLinesVertical className="text-lime-500 text-3xl mr-3" />
            Our Gallery
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Explore The Campus</h2>
          <p className="text-gray-700 leading-relaxed">
            Students at <span className='text-lime-500 font-bold'>Astrophels Institutions</span> are privy to a unique Wi-Fi campus. The Wi-Fi campus enables
            students to get online anywhere on campus without the hassle of wires and plug-ins. The campus truly represents the high-tech face of the new age.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img
              src={active}
              alt="Selected"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {data.map(({ imgelink }, index) => (
              <img
                key={index}
                onClick={() => setActive(imgelink)}
                src={imgelink}
                alt={`Gallery ${index + 1}`}
                className={`h-20 w-full rounded-lg object-cover cursor-pointer border-2 transition-transform duration-200 ${
                  active === imgelink ? "border-lime-500 scale-105" : "border-transparent hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campus;
