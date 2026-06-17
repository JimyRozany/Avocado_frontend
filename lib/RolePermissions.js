import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// GetRoles
export const GetRoles = createAsyncThunk(
  "Role/GetRoles",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/roles`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// GetRolesShow
export const GetRolesShow = createAsyncThunk(
  "Role/GetRolesShow",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/roles/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// GetPermissions
export const GetPermissions = createAsyncThunk(
  "Role/GetPermissions",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/permissions`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const DeleteRole = createAsyncThunk(
  "Role/DeleteRole",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.delete(`${Base_url}/roles/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// CreateRoles
export const CreateRoles = createAsyncThunk(
  "Role/CreateRoles",
  async (data , thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/roles`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// GetUpdateRoles
export const GetUpdateRoles = createAsyncThunk(
  "Role/GetUpdateRoles",
  async ({ data, id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.put(`${Base_url}/roles/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const RoleSlice = createSlice({
  name: "Role",
  initialState: {
    loading: false,
    RoleData: [],
    PermissionData: [],
    RoleShowData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Role data
      .addCase(GetRoles.fulfilled, (state, action) => {
        state.RoleData = action.payload;
        state.loading = false;
      })
      .addCase(GetRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRoles.rejected, (state) => {
        state.loading = false;
      })

      .addCase(CreateRoles.fulfilled, (state, action) => {
        state.RoleData.unshift(action.payload);
        state.loading = false;
      })
      .addCase(CreateRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateRoles.rejected, (state) => {
        state.loading = false;
      })

      // get Role data
      .addCase(GetRolesShow.fulfilled, (state, action) => {
        state.RoleShowData = action.payload;
        state.loading = false;
      })
      .addCase(GetRolesShow.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRolesShow.rejected, (state) => {
        state.loading = false;
      })

      // GetPermissions data
      .addCase(GetPermissions.fulfilled, (state, action) => {
        state.PermissionData = action.payload;
        state.loading = false;
      })
      .addCase(GetPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPermissions.rejected, (state) => {
        state.loading = false;
      })

      // GetUpdateRoles data
      .addCase(GetUpdateRoles.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(GetUpdateRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUpdateRoles.rejected, (state) => {
        state.loading = false;
      })

      // delete Role data
      .addCase(DeleteRole.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.RoleData = state.RoleData.filter((item) => item.id !== id);
        state.loading = false;
      })
      .addCase(DeleteRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteRole.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default RoleSlice.reducer;
