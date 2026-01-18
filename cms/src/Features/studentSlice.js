import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3003/api";

/* -------------------- THUNK -------------------- */
export const getStudentByUserId = createAsyncThunk(
  "student/getByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue("User ID is required");
      }

      const res = await axios.get(
        `${API}/getStudent/${userId}`,
        { withCredentials: true }
      );

      // Expected backend response: { message, data }
      return res.data.data;
    } catch (error) {
      console.error("GET STUDENT ERROR:", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch student data"
      );
    }
  }
);

/* -------------------- SLICE -------------------- */
const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearStudentState: (state) => {
      state.student = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- PENDING ---------- */
      .addCase(getStudentByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(getStudentByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.error = null;
      })

      /* ---------- ERROR ---------- */
      .addCase(getStudentByUserId.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      });
  },
});

/* -------------------- EXPORTS -------------------- */
export const { clearStudentState } = studentSlice.actions;
export default studentSlice.reducer;
