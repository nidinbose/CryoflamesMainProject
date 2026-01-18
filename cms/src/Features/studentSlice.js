import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3003/api";

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

export const getStudent=createAsyncThunk(
  'admin/getStudent',
  async(_,{rejectWithValue})=>{
   try {
    const res=await axios.get(`${API}/getStudents`)
    return res.data.data
   } catch (error) {
    return rejectWithValue(error.response?.data?.message)
   }
  }
)

export const updateStudentdata = createAsyncThunk(
  "admin/updateStudent",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/updateStudent/${userId}`,
        data
      );
     
      return res.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update student"
      );
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
    singleStudent:[],
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

      .addCase(getStudentByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getStudentByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.error = null;
      })

      .addCase(getStudentByUserId.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      })

      // get

      .addCase(getStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

.addCase(getStudent.fulfilled, (state, action) => {
  state.loading = false;
  state.singleStudent = Array.isArray(action.payload)
    ? action.payload
    : action.payload.data || []
})

      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      })

      // update

        .addCase(updateStudentdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStudentdata.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.error = null;
      })

      .addCase(updateStudentdata.rejected, (state, action) => {
        state.loading = false;
        state.student = null;
        state.error = action.payload;
      });
      
  },
});


export const { clearStudentState } = studentSlice.actions;
export default studentSlice.reducer;
