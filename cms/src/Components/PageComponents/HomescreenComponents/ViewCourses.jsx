import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "../../../Features/courseSlice";
import { FaClock, FaRupeeSign, FaCheckCircle } from "react-icons/fa";

const ViewCourses = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course, loading, error } = useSelector((state) => state.course);
  const { isAuthenticated, user: loggedInUser } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (id) dispatch(getCourseById(id));
  }, [dispatch, id]);

  const handleEnroll = () => {
    if (!isAuthenticated || !loggedInUser) {
      navigate("/login");
      return;
    }
    if (loggedInUser.role !== "user") {
      navigate("/login");
      return;
    }

    navigate(`/enroll/${course._id}`);
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-lg font-medium">
        Loading course details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-32 text-center text-gray-500">
        Course not found
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7fb] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src={course.image}
              alt={course.courseTitle}
              className="w-full h-[420px] object-cover"
            />
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-md space-y-6">
            <h1 className="text-4xl font-bold">{course.courseTitle}</h1>

            <p className="text-gray-600 text-lg">
              {course.description}
            </p>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <FaClock />
                {course.duration}
              </div>

              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <FaCheckCircle className="text-green-600" />
                {course.status || "Available"}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white rounded-3xl p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-2">
              <FaRupeeSign />
              <span className="text-4xl font-bold">{course.amount}</span>
            </div>

            <p className="text-gray-500 text-sm">
              One-time payment. Lifetime access.
            </p>

            <button
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
              onClick={handleEnroll}
            >
              Enroll Now
            </button>

            <div className="border-t pt-6 text-sm text-gray-600 space-y-2">
              <p>✔ Full lifetime access</p>
              <p>✔ Learn at your own pace</p>
              <p>✔ Certificate of completion</p>
              <p>✔ Expert-designed curriculum</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewCourses;
