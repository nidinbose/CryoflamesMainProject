import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/AdminDashboard");
    } else if (user?.role === "user") {
      navigate("/User");
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userLogin(form)).unwrap();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white px-4 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-xl"
        style={{ backgroundImage: "url('/Images/BG.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-300 mt-2">
            Login to continue to Astrophels
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm rounded bg-red-600 text-white text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={submitForm}>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-black/40 border border-white/20 text-sm outline-none"
                required
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
                value={form.password}
                onChange={handleChange}
                className="w-full pl-11 pr-10 py-3 rounded-full bg-black/40 border border-white/20 text-sm outline-none"
                required
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-8">
          Don’t have an account?{" "}
          <Link to="/Register" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
