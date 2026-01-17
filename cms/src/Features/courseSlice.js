import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3003/api"; 

export const createCourse = createAsyncThunk(
  "course/create",
  async (courseData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/addCourse`, courseData);
      return res.data.course;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Course creation failed"
      );
    }
  }
);
export const getAllCourses = createAsyncThunk(
  "course/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/getCourse`);
      return res.data.courses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

export const getCourseById = createAsyncThunk(
  "course/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/getCourseId/${id}`);
      return res.data.course;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course"
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/updateCourse/${id}`, data);
      return res.data.course;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Course update failed"
      );
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/deleteCourse/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Course deletion failed"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    course: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.courses.unshift(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL */
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET BY ID */
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.success = true;
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCourseState } = courseSlice.actions;
export default courseSlice.reducer;
