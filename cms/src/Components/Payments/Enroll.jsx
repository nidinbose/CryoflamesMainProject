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
    phone: "",
    dob: "",
    gender: "",
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
      alert(error);
    }
  }, [success, error, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "pincode"].includes(name)) {
      setForm({ ...form, address: { ...form.address, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    const { phone, dob, gender, address } = form;
    if (!phone || !dob || !gender || !address.street || !address.city || !address.state || !address.pincode) {
      return alert("Please fill all details");
    }

    dispatch(enrollCourse({ courseId, form, userId: user?.id }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6">Student Enrollment Form</h1>

        <input name="phone" placeholder="Phone" className="w-full border p-3 rounded mb-4" onChange={handleChange} />
        <input type="date" name="dob" className="w-full border p-3 rounded mb-4" onChange={handleChange} />
        <select name="gender" className="w-full border p-3 rounded mb-4" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input name="street" placeholder="Street" className="w-full border p-3 rounded mb-4" onChange={handleChange} />
        <input name="city" placeholder="City" className="w-full border p-3 rounded mb-4" onChange={handleChange} />
        <input name="state" placeholder="State" className="w-full border p-3 rounded mb-4" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" className="w-full border p-3 rounded mb-6" onChange={handleChange} />

        <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-xl" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Enroll;
