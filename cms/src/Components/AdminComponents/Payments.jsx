import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../../Features/studentSlice";

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { payments, loading } = useSelector((state) => state.student);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-10">Loading payments...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Payments Dashboard</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Amount (₹)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Payment ID</th>
              <th className="p-3 border">Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition"
              >
                <td className="p-3 border font-medium">{item.name}</td>
                <td className="p-3 border">{item.email}</td>
                <td className="p-3 border">
                  ₹{item.payment?.amountPaid || "—"}
                </td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        item.payment?.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.payment?.paymentStatus || "pending"}
                  </span>
                </td>
                <td className="p-3 border text-xs">
                  {item.payment?.razorpayPaymentId || "—"}
                </td>
                <td className="p-3 border text-sm">
                  {item.payment?.paidAt
                    ? new Date(item.payment.paidAt).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
