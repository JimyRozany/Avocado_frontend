import axios from "axios";
import { toast } from "react-toastify";
import { DeleteWarningData, UpdateWarningData } from "./ClientManagement";
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get Overview data
export const GetLawyerOverview = createAsyncThunk(
  "Lawyer/GetLawyerOverview",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyers/statistics`, {
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
export const GetLawyerOverviewSepcial = createAsyncThunk(
  "Lawyer/GetLawyerOverviewSepcial",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyers/overview`, {
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// UpdateLawyer
export const UpdateLawyer = createAsyncThunk(
  "Lawyer/UpdateLawyer",
  async ({ data, id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/lawyers/${id}`, data, {
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

// ActiveLawyer
export const ActiveLawyer = createAsyncThunk(
  "Lawyer/ActiveLawyer",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.patch(
        `${Base_url}/lawyers/${id}/toggle-status`,
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
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

//get Document
export const GetDocument = createAsyncThunk(
  "Lawyer/GetDocument",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/lawyer-documents/lawyer/${id}`, {
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

//create Document
export const CreateDocument = createAsyncThunk(
  "Lawyer/CreateDocument",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/lawyer-documents`, data, {
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

//Delete Document
export const DeleteDocument = createAsyncThunk(
  "Lawyer/DeleteDocument",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(`${Base_url}/lawyer-documents/${id}`, {
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
export const GetWarning = createAsyncThunk(
  "Lawyer/GetWarning",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${Base_url}/warning-histories/lawyer/${id}`,
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

//create Warning
export const CreateWarning = createAsyncThunk(
  "Lawyer/CreateWarning",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/warning-histories`, data, {
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

//Delete Warning
export const DeleteWarning = createAsyncThunk(
  "Lawyer/DeleteWarning",
  async (id, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(`${Base_url}/warning-histories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(DeleteWarningData(id));
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

//UpdateStatus Warning
export const UpdateStatusWarning = createAsyncThunk(
  "Lawyer/UpdateStatusWarning",
  async ({ id, data }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.patch(
        `${Base_url}/warning-histories/${id}/toggle-status`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(UpdateWarningData(res.data.data));
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get rating
export const GetRating = createAsyncThunk(
  "Lawyer/GetRating",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${Base_url}/reviews/user/${id}`, {
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

// Create rating
export const CreateRating = createAsyncThunk(
  "Lawyer/CreateRating",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${Base_url}/reviews`, data, {
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
    OverviewData: {},
    loadingDocument: false,
    DocumentData: false,
    loadingWarning: false,
    WarningData: {},
    RatingData: {},
    LoadingRating: false,
  },
  reducers: {
    UploadGetmyCases: (state, action) => {
      if (state?.DataCases?.cases) {
        state.DataCases.cases.unshift(action.payload);
      }
    },
    updateDeleteCases: (state, action) => {
      if (state?.DataCases?.cases) {
        state.DataCases.cases = state.DataCases.cases.filter(
          (item) => item.id !== action.payload,
        );
      }
    },
    updateStatusCases: (state, action) => {
      if (state?.DataCases?.cases) {
        // update list
        const caseItem = state.DataCases?.cases?.find(
          (item) => item.id === action.payload,
        );
        if (caseItem) {
          caseItem.status = "closed";
        }
      }
    },
  },
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

      // get Lawyer data
      .addCase(GetLawyerOverview.fulfilled, (state, action) => {
        state.OverviewData = action.payload;
        state.loading = false;
      })
      .addCase(GetLawyerOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetLawyerOverview.rejected, (state) => {
        state.loading = false;
      })

      // get Lawyer data
      .addCase(GetLawyerOverviewSepcial.fulfilled, (state, action) => {
        state.OverviewData = action.payload;
        state.loading = false;
      })
      .addCase(GetLawyerOverviewSepcial.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetLawyerOverviewSepcial.rejected, (state) => {
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
      .addCase(CreateLawyer.fulfilled, (state, action) => {
        state.LawyerData.data.data.unshift(action.payload);
        state.loadingCreate = false;
      })
      .addCase(CreateLawyer.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(CreateLawyer.rejected, (state) => {
        state.loadingCreate = false;
      })

      // ActiveLawyer
      .addCase(ActiveLawyer.fulfilled, (state, action) => {
        state.loadingActive = false;
        const id = action.payload?.id;
        const list = state.LawyerData?.data?.data;
        if (list && id !== undefined) {
          const lawyer = list.find((item) => item.id === id);
          if (lawyer) {
            lawyer.is_active = 1;
          }
        }
      })
      .addCase(ActiveLawyer.pending, (state) => {
        state.loadingActive = true;
      })
      .addCase(ActiveLawyer.rejected, (state) => {
        state.loadingActive = false;
      })

      // DeleteLawyer
      .addCase(DeleteLawyer.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.LawyerData.data.data = state.LawyerData?.data?.data?.filter(
          (item) => item.id !== id,
        );
        state.loadingDelete = false;
      })
      .addCase(DeleteLawyer.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(DeleteLawyer.rejected, (state) => {
        state.loadingDelete = false;
      })

      // get Lawyer data
      .addCase(GetDocument.fulfilled, (state, action) => {
        state.DocumentData = action.payload;
        state.loadingDocument = false;
      })
      .addCase(GetDocument.pending, (state) => {
        state.loadingDocument = true;
      })
      .addCase(GetDocument.rejected, (state) => {
        state.loadingDocument = false;
      })

      // CreateDocument
      .addCase(CreateDocument.fulfilled, (state, action) => {
        state.DocumentData.documents.unshift(action.payload);
        state.loadingDocument = false;
      })
      .addCase(CreateDocument.pending, (state) => {
        state.loadingDocument = true;
      })
      .addCase(CreateDocument.rejected, (state) => {
        state.loadingDocument = false;
      })

      // DeleteDocument
      .addCase(DeleteDocument.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.DocumentData.documents = state.DocumentData.documents.filter(
          (item) => item.id !== id,
        );
        state.loadingDocument = false;
      })
      .addCase(DeleteDocument.pending, (state) => {
        state.loadingDocument = true;
      })
      .addCase(DeleteDocument.rejected, (state) => {
        state.loadingDocument = false;
      })

      // GetWarning
      .addCase(GetWarning.fulfilled, (state, action) => {
        state.WarningData = action.payload;
        state.loadingWarning = false;
      })
      .addCase(GetWarning.pending, (state) => {
        state.loadingWarning = true;
      })
      .addCase(GetWarning.rejected, (state) => {
        state.loadingWarning = false;
      })

      // CreateWarning
      .addCase(CreateWarning.fulfilled, (state, action) => {
        state.loadingWarning = false;
      })
      .addCase(CreateWarning.pending, (state) => {
        state.loadingWarning = true;
      })
      .addCase(CreateWarning.rejected, (state) => {
        state.loadingWarning = false;
      })

      // DeleteWarning
      .addCase(DeleteWarning.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.WarningData.warnings = state.WarningData.warnings.filter(
          (item) => item.id !== id,
        );
        state.loadingWarning = false;
      })
      .addCase(DeleteWarning.pending, (state) => {
        state.loadingWarning = true;
      })
      .addCase(DeleteWarning.rejected, (state) => {
        state.loadingWarning = false;
      })

      .addCase(UpdateStatusWarning.fulfilled, (state, action) => {
        const id = action.meta.arg.id; // غالبًا انت بترسل {id, data}
        state.WarningData.warnings = state.WarningData?.warnings?.map((item) =>
          item.id === id
            ? {
                ...item,
                ...action.payload, // البيانات الراجعة من السيرفر
              }
            : item,
        );

        state.loadingWarning = false;
      })
      .addCase(UpdateStatusWarning.pending, (state) => {
        state.loadingWarning = true;
      })
      .addCase(UpdateStatusWarning.rejected, (state) => {
        state.loadingWarning = false;
      })

      // GetRating
      .addCase(GetRating.fulfilled, (state, action) => {
        state.RatingData = action.payload;
        state.LoadingRating = false;
      })
      .addCase(GetRating.pending, (state) => {
        state.LoadingRating = true;
      })
      .addCase(GetRating.rejected, (state) => {
        state.LoadingRating = false;
      })

      // CreateRating
      .addCase(CreateRating.fulfilled, (state) => {
        state.LoadingRating = false;
      })
      .addCase(CreateRating.pending, (state) => {
        state.LoadingRating = true;
      })
      .addCase(CreateRating.rejected, (state) => {
        state.LoadingRating = false;
      });
  },
});
export const { UploadGetmyCases, updateDeleteCases, updateStatusCases } =
  LawyerSlice.actions;
export default LawyerSlice.reducer;
