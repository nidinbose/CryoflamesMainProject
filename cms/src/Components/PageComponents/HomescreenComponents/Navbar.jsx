import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../../Features/authSlice";

const menuItems = ["Services", "Project", "Blog", "Company", "Work with us"];

const overlayVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut", when: "beforeChildren", staggerChildren: 0.12 },
  },
  exit: { x: "100%", transition: { duration: 0.35, ease: "easeInOut" } },
};

const itemVariants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35 } } };
const ctaVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } } };

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[1000] pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 pt-6 pointer-events-auto">
          <div className="flex items-center justify-between border border-white/10 rounded-full px-6 py-4 bg-black/40 backdrop-blur-md">
            <Link to="/">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full" />
                <div className="w-3 h-3 bg-white rounded-full -ml-1" />
                <span className="ml-2 font-medium text-white">Astrophels</span>
              </div>
            </Link>
            <ul className="hidden md:flex gap-8 text-sm text-gray-300">
              {menuItems.map((item, i) => (
                <li key={i} className="hover:text-white cursor-pointer">{item}</li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {user ? (
                <Link to={user.role === "admin" ? "/admin/AdminDashboard" : "/user"}>
                  <button className="hidden sm:flex items-center gap-2 text-white border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/10">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <FaRegUser /> {user.name}
                  </button>
                </Link>
              ) : (
                <Link to="/Login">
                  <button className="hidden sm:flex items-center gap-2 text-white border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/10">
                    <span className="w-2 h-2 bg-lime-500 rounded-full" />
                    <FaRegUser /> Login
                  </button>
                </Link>
              )}
              <button onClick={() => setOpen(true)} className="md:hidden flex flex-col gap-1.5">
                <span className="w-5 h-0.5 bg-white" />
                <span className="w-5 h-0.5 bg-white" />
                <span className="w-5 h-0.5 bg-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

    <AnimatePresence>
  {open && (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex flex-col justify-between px-8 py-10 md:hidden"
    >

      <div className="flex justify-end">
        <button
          onClick={() => setOpen(false)}
          className="text-white text-3xl"
        >
          ×
        </button>
      </div>

      <motion.ul className="flex flex-col gap-8 text-2xl font-medium text-gray-200">
        {menuItems.map((item, i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:text-white"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
      {user ? (
        <div className="border-t border-white/20 pt-6 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-white text-base font-medium">
                {user.name}
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                {user.role === "admin" ? "Admin" : "Student"}
              </span>
            </div>
          </div>

          {/* Dashboard Button */}
          <Link to={user.role === "admin" ? "/admin/AdminDashboard" : "/user"}>
            <motion.button
              variants={ctaVariants}
              onClick={() => setOpen(false)}
              className="w-full flex justify-center items-center gap-2 border border-white/20 px-6 py-3 rounded-full text-base hover:bg-white/10"
            >
              <FaRegUser />
              Go to Dashboard
            </motion.button>
          </Link>
        </div>
      ) : (
        <Link to="/Login">
          <motion.button
            variants={ctaVariants}
            onClick={() => setOpen(false)}
            className="w-full flex justify-center items-center gap-2 border border-white/20 px-6 py-3 rounded-full text-base hover:bg-white/10"
          >
            <FaRegUser /> Login
          </motion.button>
        </Link>
      )}
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default Navbar;
