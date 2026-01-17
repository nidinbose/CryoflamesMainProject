import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserStatus } from "../../Features/adminSlice";

const ViewStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.admin);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        status: user.status || "approved",
        additionalInfo: {
          image: user.additionalInfo?.image || null,
          phone: user.additionalInfo?.phone || "",
          dob: user.additionalInfo?.dob?.slice(0, 10) || "",
          gender: user.additionalInfo?.gender || "",
          address: {
            street: user.additionalInfo?.address?.street || "",
            city: user.additionalInfo?.address?.city || "",
            state: user.additionalInfo?.address?.state || "",
            pincode: user.additionalInfo?.address?.pincode || "",
          },
          course: {
            courseId: user.additionalInfo?.course?.courseId || "",
            courseName: user.additionalInfo?.course?.courseName || "",
          },
          payment: {
            amountPaid: user.additionalInfo?.payment?.amountPaid || 0,
            paymentStatus:
              user.additionalInfo?.payment?.paymentStatus || "pending",
            receiptNumber:
              user.additionalInfo?.payment?.receiptNumber || "",
            paidAt:
              user.additionalInfo?.payment?.paidAt?.slice(0, 10) || "",
          },
        },
      });
    }
  }, [user]);
  const updateNested = (path, value) => {
    setForm((prev) => {
      if (!prev) return prev;

      const keys = path.split(".");
      const updated = { ...prev };
      let temp = updated;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = key === "amountPaid" ? Number(value) : value;
        } else {
          temp[key] = { ...temp[key] };
          temp = temp[key];
        }
      });

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form || !id) return;

    dispatch(updateUserStatus({ id, data: form }));
    setEditMode(false);
  };

  if (loading || !form) {
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading student profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="p-10 bg-[#f7f7f7] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-8 border-b">
          <div className="flex items-center gap-6">
            <img
              src={
                form.additionalInfo.image
                  ? form.additionalInfo.image
                  : "/default-profile.png"
              }
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-3xl font-bold">{form.name}</h1>
              <p className="text-gray-500">{user?.accessId}</p>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-6 py-3 bg-black text-white rounded-xl"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6">

          <input
            value={form.name}
            disabled={!editMode}
            onChange={(e) => updateNested("name", e.target.value)}
            className="border p-3 rounded-xl"
            placeholder="Name"
          />

          <input
            value={form.email}
            disabled={!editMode}
            onChange={(e) => updateNested("email", e.target.value)}
            className="border p-3 rounded-xl"
            placeholder="Email"
          />

          <input
            type="date"
            disabled={!editMode}
            value={form.additionalInfo.dob}
            onChange={(e) =>
              updateNested("additionalInfo.dob", e.target.value)
            }
            className="border p-3 rounded-xl"
          />

          <select
            disabled={!editMode}
            value={form.additionalInfo.gender}
            onChange={(e) =>
              updateNested("additionalInfo.gender", e.target.value)
            }
            className="border p-3 rounded-xl"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            value={form.additionalInfo.phone}
            disabled={!editMode}
            onChange={(e) =>
              updateNested("additionalInfo.phone", e.target.value)
            }
            className="border p-3 rounded-xl"
            placeholder="Phone"
          />

          <input
            value={form.additionalInfo.course.courseName}
            disabled={!editMode}
            onChange={(e) =>
              updateNested(
                "additionalInfo.course.courseName",
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
            placeholder="Course"
          />

          <input
            type="number"
            value={form.additionalInfo.payment.amountPaid}
            disabled={!editMode}
            onChange={(e) =>
              updateNested(
                "additionalInfo.payment.amountPaid",
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
            placeholder="Amount Paid"
          />

          <select
            disabled={!editMode}
            value={form.additionalInfo.payment.paymentStatus}
            onChange={(e) =>
              updateNested(
                "additionalInfo.payment.paymentStatus",
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>

          <input
            disabled={!editMode}
            value={form.additionalInfo.address.street}
            onChange={(e) =>
              updateNested(
                "additionalInfo.address.street",
                e.target.value
              )
            }
            className="border p-3 rounded-xl col-span-2"
            placeholder="Street"
          />

          <input
            disabled={!editMode}
            value={form.additionalInfo.address.city}
            onChange={(e) =>
              updateNested(
                "additionalInfo.address.city",
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
            placeholder="City"
          />

          <input
            disabled={!editMode}
            value={form.additionalInfo.address.state}
            onChange={(e) =>
              updateNested(
                "additionalInfo.address.state",
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
            placeholder="State"
          />

          <input
            disabled={!editMode}
            value={form.additionalInfo.address.pincode}
            onChange={(e) =>
              updateNested(
                "additionalInfo.address.pincode",
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
            placeholder="Pincode"
          />

          {editMode && (
            <div className="col-span-2 flex justify-end pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-xl"
              >
                Update Student
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ViewStudent;
