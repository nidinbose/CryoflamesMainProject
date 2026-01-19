import mongoose from "mongoose";
import Student from "../Modeles/student.model.js";
import Auth from "../Modeles/auth.model.js";

export async function getByStudentId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const data = await Student.findOne({ userId })
      .populate({
        path: "userId",
        model: "Auth",
        select: "name email accessId status",
      });

    if (!data) {
      return res.status(404).json({ message: "Data not available" });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.error("GET STUDENT ERROR:", error);
    return res.status(500).json({
      message: "Internal Error. Data not available",
      error: error.message,
    });
  }
}

 export async function getAllStudents(req, res) {
  try {
    const data = await Student.find({})
      .populate({
        path: "userId",
        model: "Auth", 
        select: "name email accessId",
      });

    if (!data.length) {
      return res.status(404).json({ message: "No data available" });
    }

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data,
    });
  } catch (error) {
    console.error("GET ALL STUDENTS ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}



export async function updateStudentByUserId(req, res) {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) return res.status(400).json({ message: "userId required" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });
    const { name, email, status, ...studentData } = updateData;
    const updatedStudent = await Student.findOneAndUpdate(
      { userId },
      { $set: studentData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    if (name || email || status) {
      await Auth.findByIdAndUpdate(
        updatedStudent.userId,
        { $set: { ...(name && { name }), ...(email && { email }), ...(status && { status }) } },
        { new: true, runValidators: true }
      );
    }
    const populatedStudent = await Student.findById(updatedStudent._id).populate({
      path: "userId",
      model: "Auth",
      select: "name email accessId status",
    });

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: populatedStudent,
    });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


export async function deleteStudentByUserId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.status(400).json({ message: "userId required" });

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });

    const deletedStudent = await Student.findOneAndDelete({ userId });

    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


export async function getAllPayments(req, res) {
  try {
    const students = await Student.find({})
      .populate({
        path: "userId",
        model: "Auth",
        select: "name email",
      });

    if (!students.length)
      return res.status(404).json({ message: "No students found" });

    const paymentData = students.map((s) => ({
      userId: s.userId._id,
      name: s.userId.name,
      email: s.userId.email,
      payment: s.payment,
    }));

    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      data: paymentData,
    });
  } catch (error) {
    console.error("GET ALL PAYMENTS ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
