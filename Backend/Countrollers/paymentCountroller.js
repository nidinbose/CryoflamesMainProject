import crypto from "crypto";
import Razorpay from "razorpay";
import mongoose from "mongoose";
import Course from "../Modeles/course.model.js";
import Student from "../Modeles/student.model.js";
import dotenv from "dotenv";

dotenv.config();
const razorpay = new Razorpay({
  key_id:"rzp_test_S4qGyKthqdEPja",
  key_secret:"PyVEH5zSSojHGyuZu9vhX6Gc",
});

export const createOrder = async (req, res) => {
   try {
    const { courseId, userId } = req.body;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

       const existingPaidEnrollment = await Student.findOne({
      userId,
      "payment.paymentStatus": "paid",
    });

    if (existingPaidEnrollment) {
  
      return res.status(409).json({
        message: "User has already paid or enrolled a course. No new order created.",
      });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const amount = (course.amount ?? course.fees) * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      message: "Order creation failed",
    });
  }

};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      form,
      courseId,
      userId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courseId ||
      !userId ||
      !form
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const alreadyEnrolled = await Student.findOne({
      userId,
      "course.courseId": courseId,
    });

    if (alreadyEnrolled) {
      return res.status(409).json({ message: "User already enrolled" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Student.create({
      userId,
      phone: form.phone,
      highestQualification: form.highestQualification,
      dob: form.dob,
      gender: form.gender,
      address: form.address,
      course: {
        courseId,
        courseName: course.courseTitle ?? course.name,
      },
      payment: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amountPaid: course.amount ?? course.fees,
        paymentStatus: "paid",
        paidAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Enrollment successful",
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({
      message: "Enrollment failed",
    });
  }
};
