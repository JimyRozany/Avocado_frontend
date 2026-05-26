import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// get Case data
export const GetCase = createAsyncThunk("Case/GetCase", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get(`${Base_url}/cases`, {
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
});

// get Case data Details
export const GetCaseDetails = createAsyncThunk(
  "Case/GetCaseDetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/cases/${id}`, {
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

// CreateCase
export const CreateCase = createAsyncThunk(
  "Case/CreateCase",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/cases`, data, {
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

// Delete Case
export const DeleteCase = createAsyncThunk(
  "Case/DeleteCase",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(`${Base_url}/cases/${id}`, {
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

const CaseSlice = createSlice({
  name: "Case",
  initialState: {
    loading: false,
    CaseData: {},
    loadingDelete: false,
    CaseDataDetails: {},
    loadingCreate: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Case data
      .addCase(GetCase.fulfilled, (state, action) => {
        state.CaseData = action.payload;
        state.loading = false;
      })
      .addCase(GetCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCase.rejected, (state) => {
        state.loading = false;
      })

      // get Case data Details
      .addCase(GetCaseDetails.fulfilled, (state, action) => {
        state.CaseDataDetails = action.payload;
        state.loading = false;
      })
      .addCase(GetCaseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCaseDetails.rejected, (state) => {
        state.loading = false;
      })

      // CreateCase
      .addCase(CreateCase.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(CreateCase.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(CreateCase.rejected, (state) => {
        state.loadingCreate = false;
      })

      // DeleteCase
      .addCase(DeleteCase.fulfilled, (state, action) => {
        const id = action.meta.arg.id;
        state.CaseData = state.CaseData.filter((item) => item.id !== id);
        state.loadingDelete = false;
      })
      .addCase(DeleteCase.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(DeleteCase.rejected, (state) => {
        state.loadingDelete = false;
      });
  },
});
export default CaseSlice.reducer;
