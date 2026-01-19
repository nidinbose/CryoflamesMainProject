import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,  required: true,  trim: true,  minlength: 2,maxlength: 50, },

    email: {
      type: String,
      required: true,  unique: true,  lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    accessId: {
      type: String, required: true, unique: true, index: true,
    },

    password: {
      type: String,  required: true, minlength: 8, select: false,
    },

    role: {
      type: String,   enum: ["user", "admin"],    default: "user",
    },

    status: {
      type: String, enum: ["pending", "approved", "rejected", "blocked"], default: "pending",  index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Auth || mongoose.model("Auth", authSchema);
