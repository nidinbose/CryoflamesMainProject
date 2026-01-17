import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    accessId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
      index: true,
    },

    additionalInfo: {
      image: {
        type: String,
        trim: true,
        default: "",
      },

      phone: {
        type: String,
        trim: true,
      },

      dob: Date,

      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },

      address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
      },
      course: {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        courseName: String,
      },
      payment: {
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,

        amountPaid: {
          type: Number,
          default: 0,
        },

        paymentStatus: {
          type: String,
          enum: ["pending", "paid"],
          default: "pending",
        },

        receiptNumber: String,
        paidAt: Date,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Auth || mongoose.model("Auth", authSchema);
