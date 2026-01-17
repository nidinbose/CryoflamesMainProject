import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Features/adminSlice";
import { Link } from "react-router-dom";

const StudentsAdmin = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading students...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Students List</h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">DOB</th>
              <th className="p-4">Course</th>
              <th className="p-4">Access ID</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="p-4 font-medium">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.additionalInfo?.dob
                    ? new Date(
                        student.additionalInfo.dob
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4">
                  {student.additionalInfo?.course?.courseName || "-"}
                </td>

                <td className="p-4 font-mono text-sm">
                  {student.accessId}
                </td>

                <td className="p-4">
                  {student.email}
                </td>

                <td className="p-4">
                  <Link
                    to={`/admin/ViewStudent/${student._id}`}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {!users?.length && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsAdmin;
