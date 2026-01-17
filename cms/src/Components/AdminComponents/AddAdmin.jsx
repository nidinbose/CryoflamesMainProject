import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import { userRegister } from "../../Features/authSlice";
import { useNavigate ,Link} from "react-router-dom";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"admin"
  });
 const dispatch=useDispatch();
 const navigate=useNavigate()
 const {error,loading,isAuthenticated,user}=useSelector((state)=>state.auth)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") navigate("/login");
  }, [isAuthenticated, user, navigate]);

const handleChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         await dispatch(userRegister(formData)).unwrap()
         alert("User registration success")
         setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"user"
         })
         e.target.reset()
         navigate(`/Login`)
    } catch (error) {
        
    }
   
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden px-4 ">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-xl"
        style={{ backgroundImage: "url('/Images/BG.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mt-10 shadow-2xl"
      >
        <div className="text-center mb-1">
          <h1 className="text-3xl font-semibold">Create Account</h1>
          <p className="text-gray-300 mt-2">Sign up to get started</p>
          {error && (
  <div className="w-full p-3 text-sm rounded bg-transparent text-red-500 text-center">
    {error.message || error}
  </div>
)}
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <div className="relative mt-2">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-black/40 border border-white/20 text-sm outline-none focus:border-white/40"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-black/40 border border-white/20 text-sm outline-none focus:border-white/40"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-10 py-3 rounded-full bg-black/40 border border-white/20 text-sm outline-none focus:border-white/40"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-10 py-3 rounded-full bg-black/40 border border-white/20 text-sm outline-none focus:border-white/40"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-medium transition ${
              loading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-300 mt-8">
          Already have an account?{" "}
         <Link to={`/Login`}>
          <span className="text-white cursor-pointer hover:underline">
            Login
          </span>
         </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AddAdmin;
