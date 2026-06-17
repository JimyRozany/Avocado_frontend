import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// get user data
export const GetUser = createAsyncThunk("user/GetUser", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get(`${Base_url}/me`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("user", res.data.data);
    return res.data.data;
  } catch (error) {
    toast.error(error.response?.data.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

// login user
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.post(`${Base_url}/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      toast.success("Log in successfully");
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// register User
export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.post(`${Base_url}/register`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      toast.success("Register successfully");
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      return res.data.token;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// logout user
export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.post(
      `${Base_url}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    UserData: {},
    loadingUserData: false,
    token: null,
  },
  reducers: {
    Updatetoken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get user data
      .addCase(GetUser.fulfilled, (state, action) => {
        state.UserData = action.payload;
        state.loadingUserData = false;
      })
      .addCase(GetUser.pending, (state) => {
        state.loadingUserData = true;
      })
      .addCase(GetUser.rejected, (state) => {
        state.loadingUserData = false;
      })

      // login logic
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.loading = false;
      })

      // Register logic
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.loading = false;
      })

      //logout logic
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.UserData = {};
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { UpdateUserData, Updatetoken } = UserSlice.actions;
export default UserSlice.reducer;
