import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3003/api";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/userRegister`, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/userLogin`, userData, { withCredentials: true });
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/getProfile`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unauthorized"
      );
    }
  }
); 

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/logout`,
        {},
        { withCredentials: true } 
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
     authLoading: true,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

.addCase(userLogin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })


     .addCase(userLogout.pending, (state) => {
      state.loading = true;
    })
    .addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(userLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      .addCase(getProfile.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
         state.authLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
     .addCase(getProfile.rejected, (state, action) => {
  state.authLoading = false;
  state.user = null;
  state.isAuthenticated = false;
  if (action.payload !== "Unauthorized") {
    state.error = action.payload;
  } else {
    state.error = null;
  }
});

  },
});

export default authSlice.reducer;
