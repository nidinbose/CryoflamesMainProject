import React from 'react';

const certificationsData = [
  {
    title: "Advanced AI & Machine Learning",
    authority: "Coursera",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1581091012184-5f0e4f5d52e4?auto=format&fit=crop&w=400&q=60"
  },
  {
    title: "Full Stack Web Development",
    authority: "Udemy",
    date: "January 2025",
    image: "https://images.unsplash.com/photo-1581091215366-0f031e9c632e?auto=format&fit=crop&w=400&q=60"
  },
  {
    title: "Cybersecurity Fundamentals",
    authority: "edX",
    date: "December 2024",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=60"
  },
  {
    title: "Cloud Computing Essentials",
    authority: "Coursera",
    date: "November 2024",
    image: "https://images.unsplash.com/photo-1581092580496-78c54f452622?auto=format&fit=crop&w=400&q=60"
  },
  {
    title: "Data Science with Python",
    authority: "Udemy",
    date: "October 2024",
    image: "https://images.unsplash.com/photo-1581091012184-5f0e4f5d52e4?auto=format&fit=crop&w=400&q=60"
  }
];

const Certification = () => {
  return (
    <div className="bg-gray-50 py-16 mt-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="text-4xl font-semibold mb-4 text-gray-900">Our Certifications</h1>
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          Explore the certifications earned by our students and faculty, showcasing expertise in various modern technologies and professional fields.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{cert.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{cert.authority}</p>
                <p className="text-gray-700 flex-1">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certification;
