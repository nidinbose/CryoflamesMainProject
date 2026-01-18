import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enrollCourse, resetPaymentState } from "../../Features/paymentSlice";

const Enroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.payment);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    highestQualification: "",
    address: { street: "", city: "", state: "", pincode: "" },
  });

  useEffect(() => {
    if (!user || user.role !== "user") navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (success) {
      alert("Payment & Enrollment Successful!");
      dispatch(resetPaymentState());
      navigate("/user");
    }

    if (error) {
      const errorMessage = error?.message || error || "Something went wrong";
      alert(errorMessage);
      dispatch(resetPaymentState());
    }
  }, [success, error, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "pincode"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const { name, phone, dob, gender, address, highestQualification } = form;

    if (
      !name ||
      !highestQualification ||
      !phone ||
      !dob ||
      !gender ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      return alert("Please fill all fields");
    }

    dispatch(
      enrollCourse({
        userId: user.id || user?._id,
        courseId,
        form,
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#2f3834]/70 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mt-8 md:mt-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100 mb-3 mt-6">
            College Enrollment Application
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Complete the form below to enroll in your selected course. Please ensure all information is accurate.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-24 h-1 bg-green-400 rounded-full"></div>
            <div className="w-6 h-6 rounded-full border-4 border-white bg-yellow-400 shadow-md mx-4"></div>
            <div className="w-24 h-1 bg-red-400 rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2"></span> Enrollment Details
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#2f3834] rounded-xl">
                  <p className="text-sm text-gray-100">Course ID</p>
                  <p className="font-semibold text-white">{courseId}</p>
                </div>
                <div className="p-4 bg-[#2f3834] rounded-xl">
                  <p className="text-sm text-gray-100">Application Status</p>
                  <p className="font-semibold text-white">Pending Submission</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-700 mb-3">Required Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-[#2f3834]">✓</span> ID Proof
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-[#2f3834]">✓</span> Academic Certificates
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-[#2f3834]/30">
                <h2 className="text-2xl font-semibold text-black/80">Student Enrollment Form</h2>
                <p className="text-gray-800">Please fill in all fields accurately</p>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b flex items-center">
                      <span className="mr-2"></span> Personal Information
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                    <input
                      name="phone"
                      placeholder="+91 9876543210"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition text-gray-700"
                      value={form.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Gender *</label>
                    <select
                      name="gender"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Highest Qualification *</label>
                    <input
                      type="text"
                      name="highestQualification"
                      placeholder="e.g. B.Tech, B.Sc, Diploma"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.highestQualification}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b flex items-center">
                      <span className="mr-2"></span> Address Information
                    </h3>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Street Address *</label>
                    <input
                      name="street"
                      placeholder="House no., Street, Area"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.address.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      name="city"
                      placeholder="Enter your city"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.address.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">State *</label>
                    <input
                      name="state"
                      placeholder="Enter your state"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.address.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Pincode *</label>
                    <input
                      name="pincode"
                      placeholder="6-digit pincode"
                      className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#2f3834]/70 focus:border-transparent transition"
                      value={form.address.pincode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2 mt-8 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          By submitting, you agree to our <a href="#" className="text-[#2f3834]/90 font-medium">Terms & Conditions</a>
                        </p>
                      </div>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full sm:w-auto px-10 py-4 bg-[#2f3834] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Enrollment...
                          </>
                        ) : (
                          <>
                            <span className="mr-2"></span> Proceed to Secure Payment
                          </>
                        )}
                      </button>
                    </div>

                    {error && !loading && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-700 font-medium">⚠️ Please check the form for errors</p>
                        <p className="text-red-600 text-sm mt-1">Ensure all required fields are filled correctly</p>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">
                      <span className="mr-2">🔐</span>
                      <span>Your information is secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Form Completion</h4>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-[#2f3834] h-3 rounded-full transition-all duration-500" 
                  style={{ 
                    width: form.name && form.email && form.phone && form.dob && form.gender && form.highestQualification && 
                    form.address.street && form.address.city && form.address.state && form.address.pincode ? '100%' : '65%' 
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Basic Info</span>
                <span>Address</span>
                <span>Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;