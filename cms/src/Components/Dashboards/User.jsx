import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
import { userLogout } from "../../Features/authSlice";
import { getStudentByUserId, clearStudentState } from "../../Features/studentSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, loading, error } = useSelector((state) => state.student);
  const { user: loggedInUser, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const userId = loggedInUser?._id || loggedInUser?.id;

  useEffect(() => {
    if (!isAuthenticated || !loggedInUser) {
      navigate("/login");
    } else if (loggedInUser.role !== "user") {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, loggedInUser, navigate]);

  useEffect(() => {
    if (userId) dispatch(getStudentByUserId(userId));
    return () => dispatch(clearStudentState());
  }, [dispatch, userId]);

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(clearStudentState());
    navigate("/login");
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#2f3834]/80 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-[#2f3834] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Please enroll a course for profile creation</h3>
          <p className="text-gray-600 mb-6">{error}</p>
        <Link to={`/courses`}>
          <button
           
            className="px-6 py-2  text-white bg-[#2f3834] transition"
          >
            Explore Courses
          </button>
        </Link>
        </div>
      </div>
    );

  if (!student)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Enrollment Found</h3>
          <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );

  const {
    phone,
    image,
    dob,
    gender,
    address,
    course,
    payment,
    highestQualification,
  } = student;

  return (
    <div className="min-h-screen bg-[#2f3834]/80 pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                    <img src={image} alt=""  className="h-20 w-40 rounded-full"/>
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                      Welcome back, {loggedInUser?.name}
                    </h1>
                    <p className="text-[#2f3834] mt-1">{loggedInUser?.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-4 py-1.5 rounded-full text-sm font-light bg-[#2f3834] text-white border border-gray-500">
                     user account
                  </span>
                  {payment?.paymentStatus === "paid" ? (
                    <span className="px-4 py-1.5 rounded-full text-sm font-light bg-[#2f3834] text-white border border-gray-500">
                       enrolled
                    </span>
                  ) : (
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                       Pending payment
                    </span>
                  )}
                  {course && (
                    <span className="px-4 py-1.5 rounded-full text-sm font-light bg-[#2f3834] text-white border border-gray-500">
                       {course.courseName}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
          
                <button
                  onClick={() => navigate("/courses")}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#2f3834]  font-light border border-[#2f3834]  hover:bg-[#2f3834]  hover:text-white hover:shadow-md transition-all"
                >
                  Browse Courses
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-600 text-white font-medium hover:shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <span></span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
            
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Profile Overview</h2>
                  <p className="text-gray-500 text-sm">Personal & Academic Details</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <InfoCardItem
                  icon=""
                  label="Full Name"
                  value={loggedInUser?.name}
                />
                <InfoCardItem
                  icon=""
                  label="Email Address"
                  value={loggedInUser?.email}
                />
                <InfoCardItem
                  icon=""
                  label="Highest Qualification"
                  value={highestQualification || "Not specified"}
                />
                <InfoCardItem
                  icon=""
                  label="Phone Number"
                  value={phone || "Not provided"}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl"></span> Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                   
                    <div>
                      <p className="text-sm text-gray-500">Courses Enrolled</p>
                      <p className="text-lg font-bold">{course ? "1" : "0"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
               
                    <div>
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <p className={`text-lg font-bold ${payment?.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                        {payment?.paymentStatus === "paid" ? "Paid" : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-gray-500 text-sm">Complete personal details</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <DetailItem
                  label="Date of Birth"
                  value={formatDate(dob)}
                  icon=""
                />
                <DetailItem
                  label="Gender"
                  value={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "-"}
                  icon=""
                />
                <DetailItem
                  label="City"
                  value={address?.city || "-"}
                  icon=""
                />
                <DetailItem
                  label="State"
                  value={address?.state || "-"}
                  icon=""
                />
                <div className="md:col-span-2">
                  <DetailItem
                    label="Full Address"
                    value={
                      address
                        ? `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`
                        : "No address provided"
                    }
                    icon=""
                  />
                </div>
              </div>
            </div>

            {course && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Course Details</h3>
                    <p className="text-gray-500 text-sm">Your enrolled course information</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DetailItem
                    label="Course Name"
                    value={course.courseName}
                    icon=""
                   
                  />
                  <DetailItem
                    label="Course ID"
                    value={course.courseId}
                    icon=""
                  />
                  <div className="md:col-span-2">
                    <div className="p-4  rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3">
                  
                        <div>
                          <h4 className="font-bold text-gray-900">Enrollment Status</h4>
                          <p className="text-gray-600">You are currently enrolled in <span className="font-bold">${course.courseName}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {payment && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                 
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Payment Information</h3>
                    <p className="text-gray-500 text-sm">Transaction and billing details</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DetailItem
                    label="Amount Paid"
                    value={new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(payment.amountPaid || 0)}
                    icon=""
        
                  />
                  <DetailItem
                    label="Payment Status"
                    value={
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        payment.paymentStatus === "paid" 
                          ? ""
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      }`}>
                        {payment.paymentStatus?.toUpperCase()}
                      </span>
                    }
                    icon=""
                  />
                  <DetailItem
                    label="Order ID"
                    value={payment.razorpayOrderId || "-"}
                    icon=""
                  />
                  <DetailItem
                    label="Payment ID"
                    value={payment.razorpayPaymentId || "-"}
                    icon=""
                  />
                  <div className="md:col-span-2">
                    <DetailItem
                      label="Payment Date & Time"
                      value={
                        payment.paidAt
                          ? new Date(payment.paidAt).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            })
                          : "-"
                      }
                      icon=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center text-gray-900 text-sm">
          <p>Need assistance? Contact support@collegeportal.com | Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};


const InfoCardItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
  *
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

const DetailItem = ({ label, value, icon, highlight = false }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <span className="text-gray-500">{icon}</span>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
    <div className={`p-3 rounded-xl border ${highlight ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
      <p className={`font-medium ${highlight ? 'text-blue-700' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  </div>
);

export default UserDashboard;