import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  "https://harshainstitutions.com/wp-content/uploads/2024/05/image-88.jpg",
  "https://harshainstitutions.com/wp-content/uploads/2024/05/Indoor-Games.jpg",
  "https://harshainstitutions.com/wp-content/uploads/2024/05/image-91.jpg",
  "https://harshainstitutions.com/wp-content/uploads/2022/11/computer_lab.jpg",
];

const bgVariants = {
  initial: { opacity: 0, scale: 1.08 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const listContainer = {
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const slowSpin = {
  animate: {
    rotate: 360,
    transition: { duration: 14, repeat: Infinity, ease: "linear" },
  },
};

const reverseSpin = {
  animate: {
    rotate: -360,
    transition: { duration: 10, repeat: Infinity, ease: "linear" },
  },
};

const pulse = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const Landing = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f0d] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={current}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 lg:py-36 xl:py-60 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible"
          className="text-center md:text-left"
        >
          <p className="text-xs sm:text-sm tracking-widest text-gray-400 mb-3 sm:mb-4">
            EDUCATE WITH ASTROPHELS
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight sm:leading-tight md:leading-tight">
            Empowering minds
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-lime-300 mt-3 sm:mt-4 leading-tight">
            today to shape a better tomorrow
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base max-w-xl mx-auto md:mx-0 text-gray-300 leading-relaxed">
            Goodbye generic websites and empty promises. We empower students
            with industry-focused education and future-ready skills.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/Login" className="flex items-center justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <button className="flex items-center text-sm sm:text-base md:text-lg gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Apply Now
                </button>
                <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-white/30 rounded-full bg-white text-black text-lg hover:bg-gray-100 transition-colors">
                  →
                </button>
              </div>
            </Link>

            <button className="border border-white/30 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:bg-white/10 transition-colors">
              Explore Courses →
            </button>
          </div>
        </motion.div>
        <motion.div
          variants={fromRight}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-0"
        >
          <motion.div
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="text-gray-300 space-y-3 sm:space-y-4 text-center md:text-right"
          >
            <h3 className="text-lime-300 text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 md:mb-6 font-medium">
              Course Highlights
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
              {[
                "Mechanical Engineering",
                "Civil Engineering",
                "Automobile Engineering",
                "Electrical Engineering",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={listItem}
                  className="hover:text-lime-300 transition-colors duration-300 cursor-pointer group"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light">
                    • <span className="group-hover:pl-2 transition-all duration-300">{item}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          variants={pulse}
          animate="animate"
          className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center"
        >
          <motion.div
            variants={slowSpin}
            animate="animate"
            className="absolute inset-0 rounded-full border border-white/20"
          />
          <motion.div
            variants={reverseSpin}
            animate="animate"
            className="absolute inset-3 sm:inset-4 rounded-full border border-lime-400/40"
          />
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em]">SCROLL</span>
            <span className="text-base sm:text-lg animate-bounce">↓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;