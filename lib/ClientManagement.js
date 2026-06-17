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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get Client data
export const GetMyClient = createAsyncThunk(
  "Client/GetMyClient",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyers/${id}/clients`, {
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

// get Overview data
export const GetClientOverviewAll = createAsyncThunk(
  "Client/GetClientOverviewAll",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/clients/overview`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get Overview data
export const GetClientOverview = createAsyncThunk(
  "Client/GetClientOverview",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/clients/${id}/show-overview`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data.message);
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// CreateClient
export const CreateClient = createAsyncThunk(
  "Client/CreateClient",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/clients`, data, {
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

// UpdateClient
export const UpdateClient = createAsyncThunk(
  "Client/UpdateClient",
  async ({ data, id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/clients/${id}`, data, {
        headers: {
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

// ActiveClient
export const ActiveClient = createAsyncThunk(
  "Client/ActiveClient",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.patch(
        `${Base_url}/clients/${id}/toggle-status`,
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

// Delete Client
export const DeleteClient = createAsyncThunk(
  "Client/DeleteClient",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(`${Base_url}/clients/${id}`, {
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

//get Warning
export const GetWarningUser = createAsyncThunk(
  "Lawyer/GetWarningUser",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${Base_url}/warning-histories/client/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
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
      const res = await axios.get(`${Base_url}/clients/${id}/cases`, {
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

const ClientSlice = createSlice({
  name: "Client",
  initialState: {
    loading: false,
    ClientData: {},
    ClientDataDetails: {},
    OverviewData: {},
    OverviewDataAll: {},
    loadingActive: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingWarning: false,
    WarningData: {},
    DataCases: {},
  },
  reducers: {
    UpdateWarningData: (state, action) => {
      state.WarningData.warnings = state.WarningData?.warnings?.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              ...action.payload, // البيانات الراجعة من السيرفر
            }
          : item,
      );
    },
    UploadGetmyCasesUser: (state, action) => {
      if (state?.DataCases?.length > 0) {
        state.DataCases.unshift(action.payload);
      }
    },
    updateDeleteCasesUser: (state, action) => {
      if (state?.DataCases?.length > 0) {
        state.DataCases = state.DataCases.filter(
          (item) => item.id !== action.payload,
        );
      }
    },
    updateStatusCasesUser: (state, action) => {
      if (state?.DataCases?.length > 0) {
        // update list
        const caseItem = state.DataCases?.find(
          (item) => item.id === action.payload,
        );
        if (caseItem) {
          caseItem.status = "closed";
        }
      }
    },
    DeleteWarningData: (state, action) => {
      state.WarningData.warnings = state.WarningData.warnings.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
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

      // get Client data
      .addCase(GetMyClient.fulfilled, (state, action) => {
        state.ClientData = action.payload;
        state.loading = false;
      })
      .addCase(GetMyClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMyClient.rejected, (state) => {
        state.loading = false;
      })

      .addCase(CreateClient.fulfilled, (state, action) => {
        state.ClientData?.data?.unshift(action.payload);
        state.loading = false;
      })
      .addCase(CreateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateClient.rejected, (state) => {
        state.loading = false;
      })

      // GetClientOverview data
      .addCase(GetClientOverview.fulfilled, (state, action) => {
        state.OverviewData = action.payload;
        state.loading = false;
      })
      .addCase(GetClientOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetClientOverview.rejected, (state) => {
        state.loading = false;
      })

      // GetClientOverviewAll data
      .addCase(GetClientOverviewAll.fulfilled, (state, action) => {
        state.OverviewDataAll = action.payload;
        state.loading = false;
      })
      .addCase(GetClientOverviewAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetClientOverviewAll.rejected, (state) => {
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
      })

      // GetWarningUser
      .addCase(GetWarningUser.fulfilled, (state, action) => {
        state.WarningData = action.payload;
        state.loadingCreate = false;
      })
      .addCase(GetWarningUser.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(GetWarningUser.rejected, (state) => {
        state.loadingCreate = false;
      })

      // ActiveClient
      .addCase(ActiveClient.fulfilled, (state, action) => {
        state.loadingActive = false;
        const id = action.payload?.id;
        const list = state.ClientData?.data;
        if (list && id !== undefined) {
          const Client = list.find((item) => item.id === id);
          if (Client) {
            Client.is_active = 1;
          }
        }
      })
      .addCase(ActiveClient.pending, (state) => {
        state.loadingActive = true;
      })
      .addCase(ActiveClient.rejected, (state) => {
        state.loadingActive = false;
      })

      // DeleteClient
      .addCase(DeleteClient.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.ClientData.data = state.ClientData?.data?.filter(
          (item) => item.id !== id,
        );
        state.loadingDelete = false;
      })
      .addCase(DeleteClient.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(DeleteClient.rejected, (state) => {
        state.loadingDelete = false;
      });
  },
});
export const {
  UpdateWarningData,
  DeleteWarningData,
  updateDeleteCasesUser,
  UploadGetmyCasesUser,
  updateStatusCasesUser
} = ClientSlice.actions;
export default ClientSlice.reducer;
