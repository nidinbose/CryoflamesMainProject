import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../../Features/studentSlice";

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { payments, loading } = useSelector((state) => state.student);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  const filteredPayments = useMemo(() => {
    return payments?.filter((item) => {
      if (!item.payment?.paidAt) return false;

      const paidDate = new Date(item.payment.paidAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      if (from && paidDate < from) return false;
      if (to && paidDate > new Date(to.setHours(23, 59, 59, 999))) return false;

      return true;
    });
  }, [payments, fromDate, toDate]);

  if (loading) {
    return <p className="text-center mt-10">Loading payments...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Payments Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

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
            {filteredPayments?.length > 0 ? (
              filteredPayments.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border font-medium">{item.name}</td>
                  <td className="p-3 border">{item.email}</td>
                  <td className="p-3 border">
                    ₹{item.payment?.amountPaid}
                  </td>
                  <td className="p-3 border">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      Paid
                    </span>
                  </td>
                  <td className="p-3 border text-xs">
                    {item.payment?.razorpayPaymentId}
                  </td>
                  <td className="p-3 border text-sm">
                    {new Date(item.payment.paidAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No payments found for selected date range
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
