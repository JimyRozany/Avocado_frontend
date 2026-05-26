import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// get Lawyer data
export const GetLawyer = createAsyncThunk(
  "Lawyer/GetLawyer",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyers`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get Lawyer data Details
export const GetLawyerDetails = createAsyncThunk(
  "Lawyer/GetLawyerDetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get my cases
export const GetmyCases = createAsyncThunk(
  "Lawyer/GetmyCases",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyers/${id}/cases`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// CreateLawyer
export const CreateLawyer = createAsyncThunk(
  "Lawyer/CreateLawyer",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/lawyers`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ActiveLawyer
export const ActiveLawyer = createAsyncThunk(
  "Lawyer/ActiveLawyer",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.patch(`${Base_url}/lawyers/${id}/toggle-status`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Delete Lawyer
export const DeleteLawyer = createAsyncThunk(
  "Lawyer/DeleteLawyer",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(`${Base_url}/lawyers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const LawyerSlice = createSlice({
  name: "Lawyer",
  initialState: {
    loading: false,
    LawyerData: {},
    loadingDelete: false,
    LawyerDataDetails: {},
    loadingCreate: false,
    loadingcases: false,
    DataCases: {},
    loadingActive: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Lawyer data
      .addCase(GetLawyer.fulfilled, (state, action) => {
        state.LawyerData = action.payload;
        state.loading = false;
      })
      .addCase(GetLawyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetLawyer.rejected, (state) => {
        state.loading = false;
      })

      // get Lawyer data Details
      .addCase(GetLawyerDetails.fulfilled, (state, action) => {
        state.LawyerDataDetails = action.payload;
        state.loading = false;
      })
      .addCase(GetLawyerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetLawyerDetails.rejected, (state) => {
        state.loading = false;
      })

      // GetmyCases
      .addCase(GetmyCases.fulfilled, (state, action) => {
        state.DataCases = action.payload;
        state.loadingcases = false;
      })
      .addCase(GetmyCases.pending, (state) => {
        state.loadingcases = true;
      })
      .addCase(GetmyCases.rejected, (state) => {
        state.loadingcases = false;
      })

      // CreateLawyer
      .addCase(CreateLawyer.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(CreateLawyer.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(CreateLawyer.rejected, (state) => {
        state.loadingCreate = false;
      })

      // ActiveLawyer
      .addCase(ActiveLawyer.fulfilled, (state) => {
        state.loadingActive = false;
      })
      .addCase(ActiveLawyer.pending, (state) => {
        state.loadingActive = true;
      })
      .addCase(ActiveLawyer.rejected, (state) => {
        state.loadingActive = false;
      })

      // DeleteLawyer
      .addCase(DeleteLawyer.fulfilled, (state, action) => {
        const id = action.meta.arg.id;
        state.LawyerData = state.LawyerData.filter((item) => item.id !== id);
        state.loadingDelete = false;
      })
      .addCase(DeleteLawyer.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(DeleteLawyer.rejected, (state) => {
        state.loadingDelete = false;
      });
  },
});
export default LawyerSlice.reducer;
