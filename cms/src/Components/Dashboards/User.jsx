import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById, clearSelectedUser } from "../../Features/adminSlice";
import {userLogout } from '../../Features/authSlice'



const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser, loading, error } = useSelector((state) => state.admin);
  const { user: loggedInUser, isAuthenticated } = useSelector((state) => state.auth);

  const userId = loggedInUser?._id || loggedInUser?.id;

  useEffect(() => {
    if (!isAuthenticated || !loggedInUser) {
      navigate("/login");
    } else if (loggedInUser?.role !== "user") {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, loggedInUser, navigate]);

  useEffect(() => {
    if (userId) dispatch(getUserById(userId));
    return () => dispatch(clearSelectedUser());
  }, [dispatch, userId]);

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(clearSelectedUser());
    navigate("/login");
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!selectedUser) return <div className="p-10 text-center">User not found</div>;

  const { additionalInfo } = selectedUser;

  return (
    <div className="min-h-screen px-6 py-10 mt-16 bg-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, {selectedUser?.name}
            </h1>
            <p className="text-slate-500 mt-1">{selectedUser?.email}</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              {selectedUser?.role}
            </span>

            <span
              className={`px-4 py-1 rounded-full text-sm ${
                selectedUser?.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {selectedUser?.status}
            </span>

            <button
              onClick={handleLogout}
              className="ml-3 px-4 py-1.5 rounded-lg text-sm font-medium
                         bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-700 border-b pb-3">
              Profile Overview
            </h2>
            <InfoRow label="Full Name" value={selectedUser?.name} />
            <InfoRow label="Email" value={selectedUser?.email} />
          </div>

          <div className="lg:col-span-2 space-y-6">

            <SectionCard title="Personal Information">
              <InfoRow label="Phone" value={additionalInfo?.phone} />
              <InfoRow label="DOB" value={formatDate(additionalInfo?.dob)} />
              <InfoRow label="Gender" value={additionalInfo?.gender} />
              <InfoRow
                label="Address"
                value={
                  additionalInfo?.address
                    ? `${additionalInfo.address.street}, ${additionalInfo.address.city}, ${additionalInfo.address.state} - ${additionalInfo.address.pincode}`
                    : "-"
                }
              />
            </SectionCard>

            {additionalInfo?.course && (
              <SectionCard title="Course Details">
                <InfoRow
                  label="Course Name"
                  value={additionalInfo.course.courseName}
                />
              </SectionCard>
            )}

            {additionalInfo?.payment && (
              <SectionCard title="Payment Information">
                <InfoRow
                  label="Amount Paid"
                  value={new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(additionalInfo.payment.amountPaid || 0)}
                />
                <InfoRow
                  label="Payment Status"
                  value={additionalInfo.payment.paymentStatus}
                />
                <InfoRow
                  label="Receipt Number"
                  value={additionalInfo.payment.receiptNumber}
                />
                <InfoRow
                  label="Paid On"
                  value={
                    additionalInfo.payment.paidAt
                      ? new Date(additionalInfo.payment.paidAt).toLocaleString()
                      : "-"
                  }
                />
              </SectionCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-lg font-semibold text-slate-700 border-b pb-3 mb-4">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium text-slate-800 text-right">
      {value || "-"}
    </span>
  </div>
);

export default UserDashboard;
