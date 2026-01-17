import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8">
        <h1 className="text-4xl font-semibold text-black text-center mb-4">Get in Touch</h1>
        <p className="text-gray-800 text-center mb-12 max-w-3xl mx-auto">
          Have questions or want to connect with us? Fill out the form below or use the contact information provided. We're here to help!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f3834] transition"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f3834] transition"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f3834] transition"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f3834] transition"
              />
              <button
                type="submit"
                className="bg-[#2f3834] text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 mt-2 w-max self-start"
              >
                Send Message
              </button>
            </form>
          </div>
<div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
  <h2 className="text-3xl font-bold text-[#2f3834] mb-8 text-center lg:text-left">
    Contact Information
  </h2>

  <div className="flex flex-col gap-6">
    <div className="flex items-center gap-4">
      <div className="bg-[#2f3834] text-white p-4 rounded-full flex items-center justify-center shadow-md">
        <FaMapMarkerAlt className="text-2xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#2f3834]">Address</h3>
        <p className="text-gray-600">123 Astrophels Road, Bangalore, Karnataka, India</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="bg-[#2f3834] text-white p-4 rounded-full flex items-center justify-center shadow-md">
        <FaEnvelope className="text-2xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#2f3834]">Email</h3>
        <p className="text-gray-600">contact@astrochels.edu.in</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="bg-[#2f3834] text-white p-4 rounded-full flex items-center justify-center shadow-md">
        <FaPhone className="text-2xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#2f3834]">Phone</h3>
        <p className="text-gray-600">+91 98765 43210</p>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
