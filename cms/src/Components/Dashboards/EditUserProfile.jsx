import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentByUserId, updateStudentdata } from "../../Features/studentSlice";


const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const EditUserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, loading } = useSelector((state) => state.student);

  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
    phone: "",
    dob: "",
    gender: "",
    highestQualification: "",
    address: { street: "", city: "", state: "", pincode: "" },
    course: { courseId: "", courseName: "" },
    payment: { paymentStatus: "", amountPaid: 0 },
    image: "",
  });

  useEffect(() => {
    if (userId) dispatch(getStudentByUserId(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.userId?.name || "",
        email: student.userId?.email || "",
        status: student.userId?.status || "",
        phone: student.phone || "",
        dob: student.dob ? student.dob.split("T")[0] : "",
        gender: student.gender || "",
        highestQualification: student.highestQualification || "",
        address: { ...student.address },
        course: { ...student.course },
        payment: { ...student.payment },
        image: student.image || "",
      });
      setPreview(student.image || "/default-profile.png");
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setPreview(base64);
    setFormData((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudentdata({ userId, data: formData }))
      .unwrap()
      .then(() => navigate(-1));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6">Edit Student Profile</h2>
        <div className="flex items-center gap-6 mb-8">
          <img
            src={preview}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleChange}
            placeholder="Highest Qualification"
            className="w-full p-3 border rounded-lg"
          />

          <div className="grid grid-cols-2 gap-4">
            {["street", "city", "state", "pincode"].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={formData.address[field]}
                onChange={(e) => handleNestedChange("address", field, e.target.value)}
                className="p-3 border rounded-lg"
              />
            ))}
          </div>

          <input
            placeholder="Course Name"
            value={formData.course.courseName}
            onChange={(e) => handleNestedChange("course", "courseName", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <select
            value={formData.payment.paymentStatus}
            onChange={(e) => handleNestedChange("payment", "paymentStatus", e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Payment Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
          </select>
          <input
            type="number"
            placeholder="Amount Paid"
            value={formData.payment.amountPaid}
            onChange={(e) => handleNestedChange("payment", "amountPaid", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2f3834] text-white rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
