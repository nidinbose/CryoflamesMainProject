import React, { useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentByUserId,
  clearStudentState,
} from "../../Features/studentSlice";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
  CreditCard,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home
} from "lucide-react";

const ViewStudent = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { student, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(getStudentByUserId(userId));
    }
    return () => {
      dispatch(clearStudentState());
    };
  }, [dispatch, userId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Loading Student Profile</h3>
          <p className="text-gray-500 mt-2">Please wait while we fetch the details...</p>
        </div>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Error Loading Profile</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Student Not Found</h3>
            <p className="text-gray-600 mb-6">The requested student profile could not be found.</p>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Inactive
          </span>
        );
      case "suspended":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Suspended
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            {status}
          </span>
        );
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Paid
          </span>
        );
      case "partial":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Partial
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Students</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 flex items-center gap-3">
                Student Profile
              </h1>
              <p className="text-gray-600 mt-2">View detailed information about the student</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(student.userId?.status)}
              {getPaymentBadge(student.payment?.paymentStatus)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#2f3834] p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={student.image || "/default-profile.png"}
                  alt={student.userId?.name}
                  className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <User className="w-6 h-6 text-[#2f3834]" />
                </div>
              </div>

              <div className="text-center lg:text-left flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {student.userId?.name}
                </h2>
                <p className="text-blue-100 text-lg mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <span className=" backdrop-blur-sm px-3 py-1 rounded-full">
                    ID: {student.userId?.accessId}
                  </span>
                </p>
                
                <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[140px]">
                    <p className="text-blue-100 text-xs">Course</p>
                    <p className="text-white font-semibold text-sm">
                      {student.course?.courseName || "Not Assigned"}
                    </p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[140px]">
                    <p className="text-blue-100 text-xs">Qualification</p>
                    <p className="text-white font-semibold text-sm">
                      {student.highestQualification || "N/A"}
                    </p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[140px]">
                    <p className="text-blue-100 text-xs">Amount Paid</p>
                    <p className="text-white font-semibold text-sm">
                      ₹{student.payment?.amountPaid?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Personal Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-gray-900 font-medium">{student.userId?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-gray-900 font-medium">{student.phone || "Not Provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                      <p className="text-gray-900 font-medium">
                        {student.dob ? new Date(student.dob).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "Not Provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Gender</p>
                      <p className="text-gray-900 font-medium capitalize">{student.gender || "Not Provided"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">             
                  <h3 className="text-2xl font-semibold text-gray-900">Academic Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Award className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Highest Qualification</p>
                      <p className="text-gray-900 font-medium">{student.highestQualification || "Not Provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <BookOpen className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Course Name</p>
                      <p className="text-gray-900 font-medium">{student.course?.courseName || "Not Assigned"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Payment Details</p>
                      <div className="mt-1">
                        <p className="text-gray-900 font-medium">
                          Amount Paid: ₹{student.payment?.amountPaid?.toLocaleString() || "0"}
                        </p>
                        <div className="mt-2">
                          {getPaymentBadge(student.payment?.paymentStatus)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Account Status</p>
                      <div className="mt-1">
                        {getStatusBadge(student.userId?.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Address Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Street Address</p>
                        <p className="text-gray-900 font-medium mt-1">
                          {student.address?.street || "Not Provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">City</p>
                        <p className="text-gray-900 font-medium mt-1">
                          {student.address?.city || "Not Provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">State</p>
                        <p className="text-gray-900 font-medium mt-1">
                          {student.address?.state || "Not Provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Pincode</p>
                        <p className="text-gray-900 font-medium mt-1">
                          {student.address?.pincode || "Not Provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
            
                <h3 className="text-2xl font-semibold text-gray-900">Additional Information</h3>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registration Date</p>
                    <p className="text-gray-900 font-medium mt-1">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "Not Available"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p className="text-gray-900 font-medium mt-1">
                      {student.updatedAt ? new Date(student.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "Not Available"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Profile Completion</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#2f3834] h-2.5 rounded-full" 
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">85% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Student ID: <span className="font-medium text-gray-700">{student.userId?.accessId}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Back to List
            </button>
        <Link to={`/admin/EditProfile/${student.userId._id}`}>
            <button
            
              className="px-6 py-3 bg-[#2f3834] text-white rounded-lg  font-medium transition-colors"
            >
              Edit profile
            </button>
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;