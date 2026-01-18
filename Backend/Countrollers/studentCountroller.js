import mongoose from "mongoose";
import Student from "../Modeles/student.model.js";
import Course from "../Modeles/course.model.js";

export async function getByStudentId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.status(400).json({ message: "userId required" });

    const data = await Student.findOne({ userId:(userId) });
    if (!data)
      return res.status(404).json({ message: "Data not available" });

    return res.status(200).json({ message: "Data fetched", data });
  } catch (error) {
    console.error("GET STUDENT ERROR:", error);
    return res.status(500).json({
      message: "Internal Error. Data not available",
      error: error.message,
    });
  }
}