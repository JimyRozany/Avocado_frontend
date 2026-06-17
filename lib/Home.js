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
      const token = localStorage.getItem("authToken");
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

//getOverView
export const getOverView = createAsyncThunk(
  "Home/getOverView",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
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
      const token = localStorage.getItem("authToken");
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
