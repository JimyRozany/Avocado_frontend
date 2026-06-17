import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// get Legal data
export const GetLegal = createAsyncThunk(
  "Legal/GetLegal",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/legals`, {
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

// CreateLegal
export const CreateLegal = createAsyncThunk(
  "Legal/CreateLegal",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/legals`, data, {
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

// UpdateLegal
export const UpdateLegal = createAsyncThunk(
  "Legal/UpdateLegal",
  async ({ data, id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.put(`${Base_url}/legals/${id}`, data, {
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

// DeleteLegal
export const DeleteLegal = createAsyncThunk(
  "Legal/DeleteLegal",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.delete(`${Base_url}/legals/${id}`, {
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

const LegalSlice = createSlice({
  name: "Legal",
  initialState: {
    loading: false,
    LegalData: [],
    loadingAction: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Legal data
      .addCase(GetLegal.fulfilled, (state, action) => {
        state.LegalData = action.payload;
        state.loading = false;
      })
      .addCase(GetLegal.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetLegal.rejected, (state) => {
        state.loading = false;
      })

      // CreateLegal data
      .addCase(CreateLegal.fulfilled, (state, action) => {
        state.LegalData?.data?.unshift(action.payload);
        state.loadingAction = false;
      })
      .addCase(CreateLegal.pending, (state) => {
        state.loadingAction = true;
      })
      .addCase(CreateLegal.rejected, (state) => {
        state.loadingAction = false;
      })

      // UpdateLegal data
      .addCase(UpdateLegal.fulfilled, (state, action) => {
        const id = action.meta.arg.id;
        const index = state.LegalData?.data?.findIndex(
          (item) => item.id === id,
        );
        if (index !== -1) {
          state.LegalData.data[index] = action.payload;
        }
        state.loadingAction = false;
      })
      .addCase(UpdateLegal.pending, (state) => {
        state.loadingAction = true;
      })
      .addCase(UpdateLegal.rejected, (state) => {
        state.loadingAction = false;
      })

      // CreateLegal data
      .addCase(DeleteLegal.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.LegalData.data = state.LegalData?.data?.filter(
          (item) => item.id !== id,
        );
        state.loadingAction = false;
      })
      .addCase(DeleteLegal.pending, (state) => {
        state.loadingAction = true;
      })
      .addCase(DeleteLegal.rejected, (state) => {
        state.loadingAction = false;
      });
  },
});
export default LegalSlice.reducer;
