import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  FlaskConical, 
  Monitor, 
  Home, 
  Trophy, 
  Bus,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const infrastructureData = [
  {
    title: "Central Library",
    description:
      "A comprehensive academic library housing textbooks, reference materials, national and international journals, and digital learning resources.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-400",
    delay: 0.1
  },
  {
    title: "Advanced Laboratories",
    description:
      "Well-equipped laboratories designed to support practical exposure, innovation, and research-based learning across disciplines.",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
    icon: FlaskConical,
    color: "from-emerald-500 to-teal-400",
    delay: 0.2
  },
  {
    title: "Smart Classrooms",
    description:
      "Technology-enabled classrooms with modern teaching tools to enhance interactive and effective learning experiences.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
    icon: Monitor,
    color: "from-violet-500 to-purple-400",
    delay: 0.3
  },
  {
    title: "Hostel Facilities",
    description:
      "Comfortable and secure residential facilities with separate hostels for boys and girls, ensuring a safe campus life.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    icon: Home,
    color: "from-amber-500 to-orange-400",
    delay: 0.4
  },
  {
    title: "Sports & Recreation",
    description:
      "Extensive indoor and outdoor sports facilities promoting physical fitness, teamwork, and holistic student development.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    icon: Trophy,
    color: "from-rose-500 to-pink-400",
    delay: 0.5
  },
  {
    title: "Transportation",
    description:
      "Reliable college transportation services covering major routes to ensure safe and punctual commuting for students and staff.",
    image: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=800&q=80",
    icon: Bus,
    color: "from-indigo-500 to-blue-400",
    delay: 0.6
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const Infrastructure = () => {
  return (
    <section className="bg-[#2f3834] min-h-screen px-6 md:px-16 py-20 relative overflow-hidden rounded-xl">


      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
     

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-5xl font-semibold mb-6"
          >
            <span className="text-white">
              World-Class    Infrastructure
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className=" mx-auto my-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto"
          >
            A refined campus environment thoughtfully developed to support
            academic excellence, research, and holistic student development.
          </motion.p>

        
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {infrastructureData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={item.delay}
                className="group"
              >
                <div className=" bg-white border border-gray-700/50 rounded-2xl overflow-hidden h-full hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/10">
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      variants={imageVariants}
                      className="h-full w-full"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                    <div className={`absolute top-4 left-4 bg-gradient-to-br ${item.color} p-3 rounded-xl shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium tracking-wider text-gray-400">
                        0{index + 1}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((dot) => (
                          <div
                            key={dot}
                            className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                              dot === 1 ? item.color.replace("from-", "bg-").split(" ")[0] : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-[#2f3834] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 0.2 + item.delay, duration: 0.8 }}
                      className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"
                    />

                    <button className="text-[#2f3834] text-sm font-medium flex items-center gap-2 transition-colors duration-300 group/btn">
                      Learn more
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
   
      </div>
    </section>
  );
};

export default Infrastructure;