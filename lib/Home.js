import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// CreateForm
export const CreateForm = createAsyncThunk(
  "Home/CreateForm",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/contact-us`, data, {
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

//Get support
export const getSupport = createAsyncThunk(
  "Home/getSupport",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/contact-us`, {
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

//Get support
export const DeleteSupport = createAsyncThunk(
  "Home/DeleteSupport",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.delete(`${Base_url}/contact-us/${id}`, {
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

//Get support
export const UpdateSupport = createAsyncThunk(
  "Home/UpdateSupport",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.patch(
        `${Base_url}/contact-us/${id}/close`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

//getOverView
export const getOverView = createAsyncThunk(
  "Home/getOverView",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/dashboard`, {
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

//getCaseChart
export const getCaseChart = createAsyncThunk(
  "Home/getCaseChart",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/case-chart`, {
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

const HomeSlice = createSlice({
  name: "Home",
  initialState: {
    loading: false,
    DataOverView: {},
    CaseChatData: [],
    SupportData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Home data
      .addCase(getOverView.fulfilled, (state, action) => {
        state.DataOverView = action.payload;
        state.loading = false;
      })
      .addCase(getOverView.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOverView.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getSupport.fulfilled, (state, action) => {
        state.SupportData = action.payload;
        state.loading = false;
      })
      .addCase(getSupport.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupport.rejected, (state) => {
        state.loading = false;
      })

      .addCase(DeleteSupport.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.SupportData = state.SupportData.filter((item) => item.id !== id);
        state.loading = false;
      })
      .addCase(DeleteSupport.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteSupport.rejected, (state) => {
        state.loading = false;
      })

      .addCase(UpdateSupport.fulfilled, (state, action) => {
        const id = action.meta.arg;

        const supportItem = state.SupportData.find((item) => item.id === id);

        if (supportItem) {
          supportItem.status = "closed";
        }

        state.loading = false;
      })
      .addCase(UpdateSupport.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateSupport.rejected, (state) => {
        state.loading = false;
      })

      // get Home data
      .addCase(getCaseChart.fulfilled, (state, action) => {
        state.CaseChatData = action.payload;
        state.loading = false;
      })
      .addCase(getCaseChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCaseChart.rejected, (state) => {
        state.loading = false;
      })

      // get Home data
      .addCase(CreateForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateForm.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default HomeSlice.reducer;
