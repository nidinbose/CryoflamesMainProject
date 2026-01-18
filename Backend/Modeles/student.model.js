import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    image: { type: String, trim: true, default: "" },
    highestQualification: { type: String },
    phone: { type: String, trim: true },
    dob: Date,
    gender: { type: String, enum: ["male", "female", "other"] },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    course: {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      courseName: String,
    },
    payment: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      amountPaid: { type: Number, default: 0 },
      paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
      receiptNumber: String,
      paidAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model("Student", studentSchema);
