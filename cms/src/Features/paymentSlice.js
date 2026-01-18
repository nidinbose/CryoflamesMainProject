import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3003/api"; 

export const enrollCourse = createAsyncThunk(
  "payment/enrollCourse",
  async ({ courseId, form, userId }, { rejectWithValue }) => {
    try {
      const orderRes = await axios.post(
        `${API}/create-order`,
        { courseId,userId },
        { withCredentials: true }
      );

      const { key, amount, orderId } = orderRes.data;
      const loadRazorpay = () =>
        new Promise((resolve) => {
          if (window.Razorpay) return resolve(true);
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) throw new Error("Razorpay SDK failed to load");

      return new Promise((resolve, reject) => {
        const options = {
          key,
          amount,
          currency: "INR",
          name: "College Management",
          description: "Course Enrollment",
          order_id: orderId,
          prefill: {
            name: form.name || "",
            email: form.email || "",
          },
          theme: { color: "#000000" },
          handler: async (response) => {
            try {
              await axios.post(
                `${API}/verify-payment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId,
                  userId,
                  form,
                },
                { withCredentials: true }
              );

              resolve({ success: true });
            } catch (err) {
              reject(err.response?.data || err.message);
            }
          },
          modal: {
            ondismiss: () => reject("Payment cancelled by user"),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Payment failed";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
