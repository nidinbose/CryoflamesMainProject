import React, { useEffect, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Crist Lily",
    role: "General manager at Mozil",
    text: `Perspective didn’t just design for us—They delivered innovative solutions that truly drove results.

Their creative vision and attention to detail gave us a refined product that stands out and converts.`,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  {
    name: "Daniel Roy",
    role: "Product Lead at Stripe",
    text: `The team understood our goals perfectly and delivered beyond expectations.

Our conversions increased significantly within weeks.`,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Sarah Lee",
    role: "Founder at Creatix",
    text: `Clean design, thoughtful UX, and powerful branding.

They helped us build trust instantly with our audience.`,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    name: "Michael Scott",
    role: "Marketing Head at Dunder",
    text: `Every detail was polished. The final product feels premium and high-converting.

Highly recommended.`,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Aisha Khan",
    role: "CEO at Nova Labs",
    text: `They transformed our idea into a scalable, modern solution.

The results exceeded our KPIs.`,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-[#2f3834]/10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <span>Voice of Trust</span>
            <span className="w-24 h-px bg-gray-400" />
            <span>Bold Feedback</span>
          </div>

          <h1 className="text-6xl font-bold mt-6">Testimonials</h1>
          <p className="text-gray-600 mt-4">
            Real stories. real results. see what our customers are saying
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 transition-opacity duration-500">
          <div className="relative rounded-[28px] overflow-hidden w-[280px] h-[360px]">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center text-white">
                <FaPlay />
              </span>
            </span>
          </div>
          <div className="bg-white rounded-[32px] p-10 max-w-3xl shadow-sm">
            <h3 className="text-2xl font-semibold">{current.name}</h3>
            <p className="text-gray-500 mb-6">{current.role}</p>

            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              “{current.text}”
            </p>
            <div className="flex justify-end mt-8 gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-black"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-6">

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-black flex items-center justify-center">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">5.0</span>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Based on 32 clutch review
              </p>
            </div>
          </div>

          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            See All Review
          </button>

          <div className="flex gap-4">
            <button
              onClick={() =>
                setIndex((index - 1 + testimonials.length) % testimonials.length)
              }
              className="w-12 h-12 rounded-full  hover:bg-black border border-black text-black hover:text-white flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={() =>
                setIndex((index + 1) % testimonials.length)
              }
              className="w-12 h-12 rounded-full hover:bg-black border border-black text-black hover:text-white flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
