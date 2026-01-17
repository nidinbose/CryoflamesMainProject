import crypto from "crypto";
import Auth from "../Modeles/auth.model.js";
import Course from "../Modeles/course.model.js";
import Razorpay from "razorpay";
import env from "dotenv";

env.config();



const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
});
console.log("Razorpay instance initialized:", razorpay.orders ? " OK" : " Failed");

export async function createOrder(req, res) {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!razorpay || !razorpay.orders) {
      return res.status(500).json({ message: "Razorpay not initialized" });
    }

    const order = await razorpay.orders.create({
      amount: course.amount * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
}
export async function verifyPayment(req, res) {
  try {
    const { courseId, form, payment, userId } = req.body;

    if (!courseId || !form || !payment || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (
      !payment.razorpay_order_id ||
      !payment.razorpay_payment_id ||
      !payment.razorpay_signature
    ) {
      return res.status(400).json({ message: "Invalid payment object" });
    }

    const body = payment.razorpay_order_id + "|" + payment.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== payment.razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.additionalInfo = {
      ...form,
      course: {
        courseId: course._id,
        courseName: course.courseTitle,
      },
      payment: {
        razorpayOrderId: payment.razorpay_order_id,
        razorpayPaymentId: payment.razorpay_payment_id,
        razorpaySignature: payment.razorpay_signature,
        amountPaid: course.amount,
        paymentStatus: "paid",
        paidAt: new Date(),
        receiptNumber: `REC-${Date.now()}`,
      },
    };
    user.status = "pending";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Enrollment & payment successful",
    });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    return res.status(500).json({
      message: "Payment verification failed",
      error: err.message,
    });
  }
}