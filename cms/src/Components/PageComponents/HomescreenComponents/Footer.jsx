import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2f3834] text-white pt-24 pb-10 px-6 rounded-t-3xl
">
      <div className="max-w-7xl mx-auto">

        {/* Top CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-xl">
            Ready to shape your future with us?
          </h2>

          <button className="bg-white text-black px-10 py-4 rounded-full font-medium hover:bg-gray-200 transition">
            Apply Now →
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-20" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Astrophels</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students through innovation, creativity,
              and world-class education environments.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Navigation
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition">Home</li>
              <li className="hover:text-white transition">Courses</li>
              <li className="hover:text-white transition">Campus</li>
              <li className="hover:text-white transition">Testimonials</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Resources
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition">Admissions</li>
              <li className="hover:text-white transition">Scholarships</li>
              <li className="hover:text-white transition">Events</li>
              <li className="hover:text-white transition">Support</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Follow Us
            </h4>

            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-20 pt-8 border-t border-white/10 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Astrophels. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
