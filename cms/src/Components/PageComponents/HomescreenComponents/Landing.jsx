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
    <div className="relative min-h-screen  bg-[#0b0f0d] text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-60 grid md:grid-cols-2 gap-16 items-center">

        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-sm tracking-widest text-gray-400 mb-4">
            EDUCATE WITH ASTROPHELS
          </p>

          <h1 className="text-5xl font-roboto md:text-6xl font-semibold leading-tight">
          Empowering minds
          </h1>

          <h2 className="text-4xl font-demo md:text-5xl font-semibold text-lime-300 mt-4">
          today to shape a better tomorrow
          </h2>

          <p className="mt-6  max-w-xl text-gray-300 leading-relaxed">
            Goodbye generic websites and empty promises. We empower students
            with industry-focused education and future-ready skills.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to={`/Login`}>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Apply Now
            </button>
            </Link>

            <button className="border border-white/30 px-6 py-3 rounded-full text-sm hover:bg-white/10">
              Explore Courses →
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fromRight}
          initial="hidden"
          animate="visible"
          className="flex justify-end"
        >
          <motion.div
            variants={listContainer}
            initial="hidden"
            animate="visible"
            className="text-gray-300 space-y-4 text-right text-2xl"
          >
            <h3 className="text-lime-300 text-xl mb-2">Course Highlights</h3>

            {[
              "Mechanical Engineering",
              "Civil Engineering",
              "Automobile Engineering",
              "Electrical Engineering",
            ].map((item, index) => (
              <motion.p
                key={index}
                variants={listItem}
                className="hover:text-lime-300 transition"
              >
                • {item}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          variants={pulse}
          animate="animate"
          className="relative w-28 h-28 flex items-center justify-center"
        >
          <motion.div
            variants={slowSpin}
            animate="animate"
            className="absolute inset-0 rounded-full border border-white/20"
          />
          <motion.div
            variants={reverseSpin}
            animate="animate"
            className="absolute inset-4 rounded-full border border-lime-400/40"
          />
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
            <span className="text-lg animate-bounce">↓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
