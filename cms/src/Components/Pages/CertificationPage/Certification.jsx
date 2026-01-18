import React,{useEffect}from 'react';

const certificationsData = [
  {
    title: "Advanced AI & Machine Learning",
    authority: "Coursera",
    date: "March 2025",
    image: "https://m.media-amazon.com/images/I/71Uds859DZL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Full Stack Web Development",
    authority: "Udemy",
    date: "January 2025",
    image: "https://codingbytes.com/wp-content/uploads/2022/03/full-stack-web-development.jpg"
  },
  {
    title: "Cybersecurity Fundamentals",
    authority: "edX",
    date: "December 2024",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzgLSbmgYxJMTJcUwssl1hmgjJjLsURQsWjg&s"
  },
  {
    title: "Cloud Computing Essentials",
    authority: "Coursera",
    date: "November 2024",
    image: "https://bernardmarr.com/img/The%205%20Biggest%20Cloud%20Computing%20Trends%20In%202021.jpg"
  },
  {
    title: "Data Science with Python",
    authority: "Udemy",
    date: "October 2024",
    image: "https://cdn.shopaccino.com/igmguru/articles/Career-In-Data-Science.webp?v=546"
  },
    {
    title: "devops",
    authority: "Udemy",
    date: "October 2024",
    image: "https://devopedia.org/images/article/54/7602.1513404277.png"
  }
];

const Certification = () => {
    useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
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
