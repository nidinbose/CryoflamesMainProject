import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudent } from "../../Features/studentSlice";
import { User, BookOpen,  ChevronRight} from "lucide-react";

const StudentsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleStudent, loading, error } = useSelector((state) => state.student);
  const { user, isAuthenticated  } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isAuthenticated && user?.role !== "admin") {
      navigate(`/login`)
    }
  }, [isAuthenticated, user]);
  useEffect(()=>{
  dispatch(getStudent());
  },[dispatch])
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-700">Loading Student Profiles...</h3>
            <p className="text-gray-500 mt-2">Please wait while we fetch the student information</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="px-10 mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Error Loading Students</h3>
                <p className="mt-2 text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="px-10 mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 flex items-center gap-3">
              Users
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <span className=" text-[#2f3834] text-sm font-medium px-3 py-1 rounded-full">
                Total Students: {singleStudent?.length || 0}
              </span>
              <span className="text-sm">• Admin Portal</span>
            </p>
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-10 mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {singleStudent?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-[#2f3834] p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={item.image || "/avatar.png"}
                      alt={item.userId?.name}
                      className="w-20 h-20 rounded-full border-1 border-white object-cover"
                    />
                    {/* <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div> */}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{item.userId?.name}</h2>
                    <p className="text-blue-100 flex items-center gap-2 mt-1">
                      <BookOpen size={16} />
                      {item.course.courseName || "Undergraduate"}
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">ID: {item.userId?.accessId}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                 
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{item.userId?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Highest Qualification</p>
                      <p className="font-medium text-gray-900">{item.highestQualification || "Not Specified"}</p>
                    </div>
                  </div>
                  {item.department && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium text-gray-900">{item.department}</p>
                      </div>
                    </div>
                  )}

                  {item.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Contact Number</p>
                        <p className="font-medium text-gray-900">{item.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/admin/ViewStudent/${item.userId._id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-[#2f3834] text-white font-medium py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                  >
                    View Full Profile
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!singleStudent|| singleStudent.length === 0) && !loading && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <User className="text-gray-400" size={48} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Students Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are currently no student profiles available. New student profiles will appear here once they register.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsAdmin;