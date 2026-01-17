import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../Features/courseSlice";
import { Link } from "react-router-dom";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-20">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  return (
    <div className="bg-[#f7f7f7] py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {courses?.map((course) => (
          <div
            key={course._id}
            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden"
          >
            {/* IMAGE */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={course.image}
                alt={course.courseTitle}
                className="h-52 w-full object-cover transform group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* CONTENT */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">
                {course.courseTitle}
              </h3>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* PRICE */}
            <div className="mt-4">
              <span className="text-xl font-bold text-black">
                ₹ {course.amount}
              </span>
            </div>

            {/* HOVER BUTTON */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <Link
                to={`/ViewCourses/${course._id}`}
                className="bg-white text-black px-8 py-3 rounded-full font-medium transform translate-y-10 group-hover:translate-y-0 transition duration-500 hover:bg-gray-200"
              >
                View Course →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
