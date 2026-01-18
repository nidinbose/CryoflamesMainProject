import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllCourses,createCourse,updateCourse,deleteCourse, clearCourseState,
} from "../../Features/courseSlice";

const initialForm = {
  courseTitle: "",
  description: "",
  image: "",
  duration: "",
  amount: "",
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CoursesAdmin = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { courses, loading } = useSelector((state) => state.course);
    const { user, isAuthenticated } = useSelector((state) => state.auth);


    useEffect(() => {
      if (!isAuthenticated || user?.role !== "admin") navigate("/login");
    }, [isAuthenticated, user, navigate]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        alert("Image size must be under 2MB");
        return;
      }
      const base64 = await convertToBase64(files[0]);
      setFormData({ ...formData, image: base64 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditId(course._id);
    setFormData({
      courseTitle: course.courseTitle,
      description: course.description,
      image: course.image,
      duration: course.duration,
      amount: course.amount,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateCourse({ id: editId, data: formData }));
    } else {
      dispatch(createCourse(formData));
    }

    setShowModal(false);
    dispatch(clearCourseState());
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  return (
    <div className="p-8 space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Courses Management</h1>
        <button
          onClick={openAddModal}
          className="bg-[#2f3834] text-white px-6 py-3 rounded-xl hover:bg-gray-800"
        >
          + Add Course
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#2f3834] text-white text-sm ">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses?.map((course) => (
              <tr key={course._id} className="border-t">
                <td className="p-4">
                  <img
                    src={course.image}
                    alt={course.courseTitle}
                    className="h-14 w-20 object-cover rounded-lg"
                  />
                </td>
                <td className="p-4 font-medium">
                  {course.courseTitle}
                </td>
                <td className="p-4">{course.duration}</td>
                <td className="p-4">₹ {course.amount}</td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => openEditModal(course)}
                    className="px-4 py-2 bg-[#2f3834] text-white rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="px-4 py-2 hover:bg-red-600 bg-[#2f3834] text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!courses?.length && !loading && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-6">
              {editId ? "Edit Course" : "Add Course"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="courseTitle"
                placeholder="Course Title"
                value={formData.courseTitle}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-xl"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-xl"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
              />

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-40 w-full object-cover rounded-xl border"
                />
              )}

              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 6 Weeks)"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="number"
                name="amount"
                placeholder="Price"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-xl"
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-xl"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesAdmin;
