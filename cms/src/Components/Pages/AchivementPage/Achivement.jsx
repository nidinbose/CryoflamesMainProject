import React from 'react';
import { FaTrophy, FaBriefcase, FaLightbulb, FaFootballBall, FaTheaterMasks } from 'react-icons/fa';
import Awards from '../../PageComponents/HomescreenComponents/Awards';

const achievementsData = [
  {
    title: "Best Engineering College Award",
    description: "Awarded by National Education Board 2025 for excellence in academics and infrastructure.",
    icon: <FaTrophy className="text-yellow-500" />,
  },
  {
    title: "100% Placement Drive",
    description: "All eligible students got placed in top companies like Infosys, TCS, and Wipro.",
    icon: <FaBriefcase className="text-green-500" />,
  },
  {
    title: "Innovative Project Showcase",
    description: "Students presented 50+ innovative projects in the National Tech Expo 2025.",
    icon: <FaLightbulb className="text-blue-500" />,
  },
  {
    title: "Sports Championship",
    description: "Won the inter-college football and cricket championship 2025.",
    icon: <FaFootballBall className="text-red-500" />,
  },
  {
    title: "Cultural Fest Winner",
    description: "First place in the national-level cultural fest with over 20 colleges participating.",
    icon: <FaTheaterMasks className="text-purple-500" />,
  },
];

const Achivement = () => {
  return (
   <div>
    <Awards/>
     <div className="bg-gray-50 py-16">
        
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="text-4xl font-semibold mb-4 text-gray-900">Our Achievements</h1>
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          Astrophels Engineering College is proud of its students and faculty for consistently achieving excellence in academics, sports, and cultural activities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {achievementsData.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-6xl mb-5">{achievement.icon}</div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">{achievement.title}</h2>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default Achivement;
