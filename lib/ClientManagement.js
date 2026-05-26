import axios from "axios";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// get Client data
export const GetClient = createAsyncThunk(
  "Client/GetClient",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/clients`, {
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

// get Client data Details
export const GetClientDetails = createAsyncThunk(
  "Client/GetClientDetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/clients/${id}`, {
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

const ClientSlice = createSlice({
  name: "Client",
  initialState: {
    loading: false,
    ClientData: {},
    ClientDataDetails: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get Client data
      .addCase(GetClient.fulfilled, (state, action) => {
        state.ClientData = action.payload;
        state.loading = false;
      })
      .addCase(GetClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetClient.rejected, (state) => {
        state.loading = false;
      })

      // get Client data Details
      .addCase(GetClientDetails.fulfilled, (state, action) => {
        state.ClientDataDetails = action.payload;
        state.loading = false;
      })
      .addCase(GetClientDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetClientDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default ClientSlice.reducer;
