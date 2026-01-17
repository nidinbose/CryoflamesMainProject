import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import Auth from '../Modeles/auth.model.js'

import mongoose from 'mongoose';
export async function userRegister(req, res) {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword ||! role) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 50 characters',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    success: false,
    message:
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
  });
}
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

const generateAdminAccessId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ADM${randomPart}`;
};

const generateUserAccessId = () => {
  const chars = 'A1B2C3D4E5F6G7H8I9J3KLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `USR${randomPart}`;
};
    let finalRole = 'user';
    let status = 'pending';
    let accessId = generateUserAccessId();
    if (role === 'admin') {
    

      finalRole = 'admin';
      status = 'approved';
      accessId = generateAdminAccessId();
    }
    const user = await Auth.create({
      name: name.trim(),email: email.toLowerCase().trim(),
      password: hashedPassword,role: finalRole,status, accessId,
    });
    return res.status(201).json({
      success: true,
      message:
        finalRole === 'admin'
          ? 'Admin registered successfully': 'Registration successful. Awaiting admin approval.',
      data: {id: user._id,name: user.name,
        email: user.email,role: user.role,status: user.status, accessId: user.accessId,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate email or accessId',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}


const JWT_EXPIRES_IN = "1d";

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await Auth.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (["pending", "rejected", "blocked"].includes(user.status)) {
      return res.status(403).json({
        success: false,
        message: `Your account is ${user.status}`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
  
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}




export async function getProfile(req, res) {
  try {
    const userId = req.user.id;

    const user = await Auth.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account is temporarily blocked",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessId: user.accessId,
        role: user.role,
        status: user.status,
        image: user.image || null,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function updateUser (req, res) {
  const { status } = req.body;
  const allowedStatus = ["approved", "rejected", "blocked","pending"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const user = await Auth.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.status = status;
  await user.save();

  res.status(200).json({
    success: true,
    message: `User ${status} successfully`,
    user,
  });
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({ role: "user" }).select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};


 export async function getUserById (req, res){
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await Auth.findById(id).select(
      "-password -role -status"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};


export async function updateAdditionalInfo(req, res) {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const {
      image,
      phone,
      dob,
      gender,
      address,
      course,
      payment,
    } = req.body;

    const updateData = {};

    if (image !== undefined)
      updateData["additionalInfo.image"] = image;

    if (phone !== undefined)
      updateData["additionalInfo.phone"] = phone;

    if (dob !== undefined)
      updateData["additionalInfo.dob"] = dob;

    if (gender !== undefined)
      updateData["additionalInfo.gender"] = gender;

    if (address) {
      if (address.street !== undefined)
        updateData["additionalInfo.address.street"] = address.street;

      if (address.city !== undefined)
        updateData["additionalInfo.address.city"] = address.city;

      if (address.state !== undefined)
        updateData["additionalInfo.address.state"] = address.state;

      if (address.pincode !== undefined)
        updateData["additionalInfo.address.pincode"] = address.pincode;
    }

    if (course) {
      if (course.courseId !== undefined)
        updateData["additionalInfo.course.courseId"] = course.courseId;

      if (course.courseName !== undefined)
        updateData["additionalInfo.course.courseName"] = course.courseName;
    }
    if (payment) {
      if (payment.amountPaid !== undefined)
        updateData["additionalInfo.payment.amountPaid"] = payment.amountPaid;

      if (payment.paymentStatus !== undefined)
        updateData["additionalInfo.payment.paymentStatus"] =
          payment.paymentStatus;

      if (payment.receiptNumber !== undefined)
        updateData["additionalInfo.payment.receiptNumber"] =
          payment.receiptNumber;

      if (payment.paidAt !== undefined)
        updateData["additionalInfo.payment.paidAt"] = payment.paidAt;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid additional information provided",
      });
    }

    const updatedUser = await Auth.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        select: "-password -role -status",
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Additional information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update additional information",
      error: error.message,
    });
  }
}



export async function userLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
