import React from "react";
import { motion } from "framer-motion";

const awards = [
  { id: "01", label: "Years of Services", value: "05", highlight: true },
  { id: "02", label: "Number of Awards", value: "08" },
  { id: "03", label: "Creative Minds", value: "50+" },
  { id: "04", label: "Years of Experience", value: "11" },
  { id: "05", label: "Satisfied Clients", value: "200+" },
];

// Animation variants
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

const cardAnim = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Awards = () => {
  return (
    <section className="relative min-h-screen bg-[#2f3834] text-white overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-28"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          variants={fadeUp}
          className="text-sm text-gray-300 max-w-md mb-10 leading-relaxed"
        >
          Quietly we say,
          <br />
          every design we create tells a story of success
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-200 mb-20"
        >
          Our Awards &
        </motion.h1>
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {awards.map((item) => (
            <motion.div
              key={item.id}
              variants={cardAnim}
              whileHover={{ y: -8 }}
              className={`rounded-3xl p-6 flex flex-col justify-between min-h-[260px] transition
                ${
                  item.highlight
                    ? "bg-[#e9ede9] hover:bg-gradient-to-br from-[#7a8b83] to-[#4a5a54] text-black hover:text-white"
                    : "bg-[#e9ede9] hover:bg-gradient-to-br from-[#7a8b83] to-[#4a5a54] text-black hover:text-white"
                }`}
            >
              <div>
                <span className="text-sm opacity-70">{item.id}</span>
                <p className="mt-24 text-sm opacity-80">{item.label}</p>
              </div>

              <h2 className="text-5xl font-semibold tracking-wide">
                {item.value}
              </h2>
            </motion.div>
          ))}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-10 right-6 text-[18vw] font-bold text-white pointer-events-none"
        >
          Achievement
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default Awards;
