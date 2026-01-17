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

       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-5 mt-8">

    <div className="flex items-center gap-6">
      <span className="text-xl font-medium">10+</span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>

    <div className="space-y-6">
      <p className="text-sm tracking-wide text-gray-500">
        Crafted with Vision, Delivered as
      </p>

      <h1 className="text-5xl sm:text-6xl md:text-5xl font-bold leading-tight">
      Our Courses
      </h1>

      <p className="text-gray-600 max-w-md leading-relaxed">
        Our courses reflect a perfect balance of academic excellence and
        industry relevance. We don’t just teach subjects — we build
        future-ready professionals.
      </p>
    </div>

    <div className="space-y-4 text-right">
      <p className="text-gray-400 cursor-pointer hover:text-black transition">
        All Courses
      </p>
      <p className="text-gray-400 cursor-pointer hover:text-black transition">
            Web & Technology
      </p>
      <p className="text-black font-medium">
     Engineering
      </p>
      <p className="text-gray-400 cursor-pointer hover:text-black transition">
        Management
      </p>
    </div>

  </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mt-6">
        {courses?.map((course) => (
          <div
            key={course._id}
            className="group bg-transparent border border-gray-400 rounded-3xl p-3 transition-all duration-500 relative overflow-hidden"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={course.image}
                alt={course.courseTitle}
                className="h-52 w-full object-cover transform group-hover:scale-110 transition duration-700"
              />
            </div>

         <div className="bg-white p-3 rounded-3xl mt-4">
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">
                {course.courseTitle}
              </h3>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {course.description}
              </p>
            </div>
             <div className="font-bold">
                ₹ {course.amount} <p className="text-xs font-light">(Included all years)</p>
             </div>
            <div className="mt-4 bg-gray-200 p-3 rounded-3xl ">
              <span className="text-lg font-bold text-gray-700 flex gap-2 items-center justify-center">
              
                <p className="flex justify-end text-sm">Duration : {course.duration}</p>
              </span>
            </div>
         </div>

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
            <Link
  to={`/ViewCourses/${course._id}`}
  className="
    inline-flex items-center justify-center
    bg-white text-black
    px-8 py-4
    rounded-full
    font-medium
    transform translate-y-10
    group-hover:translate-y-0
    transition-all duration-500 hover:bg-gray-200 whitespace-nowrap
  "
>
  View Details →
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
