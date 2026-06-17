import axios from "axios";
import { toast } from "react-toastify";
import { updateDeleteCases, updateStatusCases, UploadGetmyCases } from "./LawyerManagement";
import { updateDeleteCasesUser, updateStatusCasesUser, UploadGetmyCasesUser } from "./ClientManagement";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

// get Case data
export const GetCase = createAsyncThunk("Case/GetCase", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
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
    return rejectWithValue(error.response?.data || error.message);
  }
});

// get Case data
export const GetOverFlowCase = createAsyncThunk(
  "Case/GetOverFlowCase",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.get(`${Base_url}/cases-overview`, {
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

// get Case data Details
export const GetCaseDetails = createAsyncThunk(
  "Case/GetCaseDetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
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

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// CreateCase
export const CreateCase = createAsyncThunk(
  "Case/CreateCase",
  async (data, thunkApi) => {
    const { dispatch,rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/cases`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      dispatch(UploadGetmyCases(res.data.data))
      dispatch(UploadGetmyCasesUser(res.data.data))
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// UpdateCase
export const UpdateCase = createAsyncThunk(
  "Case/UpdateCase",
  async ({data,id}, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/cases/${id}`, data, {
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

// ForceClose
export const ForceClose = createAsyncThunk(
  "Case/ForceClose",
  async (id, thunkApi) => {
    const { dispatch , rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.patch(
        `${Base_url}/cases/${id}/force-close`,
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
      dispatch(updateStatusCases(id))
      dispatch(updateStatusCasesUser(id))
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Delete Case
export const DeleteCase = createAsyncThunk(
  "Case/DeleteCase",
  async (id, thunkApi) => {
    const { dispatch , rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.delete(`${Base_url}/cases/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      dispatch(updateDeleteCases(id))
      dispatch(updateDeleteCasesUser(id))
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data.message);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

//create Document
export const createDocument = createAsyncThunk(
  "Case/createDocument",
  async ({ data, id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/cases/${id}/documents`, data, {
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

//create Session
export const createSession = createAsyncThunk(
  "Case/createSession",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.post(`${Base_url}/case-sessions`, data, {
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

//Delete Session
export const DeleteSession = createAsyncThunk(
  "Case/DeleteSession",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      const res = await axios.delete(`${Base_url}/case-sessions/${id}`, {
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

const CaseSlice = createSlice({
  name: "Case",
  initialState: {
    loading: false,
    CaseData: {},
    CaseDataOverFlow: {},
    loadingDelete: false,
    loadingForce: false,
    CaseDataDetails: {},
    loadingCreate: false,
    loadingDocuments: false,
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

      // get Case data
      .addCase(GetOverFlowCase.fulfilled, (state, action) => {
        state.CaseDataOverFlow = action.payload;
        state.loading = false;
      })
      .addCase(GetOverFlowCase.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetOverFlowCase.rejected, (state) => {
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

      // get Case data Details
      .addCase(ForceClose.fulfilled, (state, action) => {
        const id = action.meta.arg;

        // update list
        const caseItem = state.CaseData?.data?.find((item) => item.id === id);
        if (caseItem) {
          caseItem.status = "closed";
        }

        // update details if it's the same case
        if (state.CaseDataDetails?.id === id) {
          state.CaseDataDetails.status = "closed";
        }

        state.loadingForce = false;
      })
      .addCase(ForceClose.pending, (state) => {
        state.loadingForce = true;
      })
      .addCase(ForceClose.rejected, (state) => {
        state.loadingForce = false;
      })

      // CreateCase
      .addCase(CreateCase.fulfilled, (state, action) => {
        state.CaseData?.data?.unshift(action.payload);
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
        const id = action.meta.arg;
        state.CaseData.data = state.CaseData?.data?.filter(
          (item) => item.id !== id,
        );
        state.loadingDelete = false;
      })
      .addCase(DeleteCase.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(DeleteCase.rejected, (state) => {
        state.loadingDelete = false;
      })

      // createDocument
      .addCase(createDocument.fulfilled, (state, action) => {
        const { id } = action.meta.arg; // case id
        const document = action.payload; // returned document

        if (state.CaseDataDetails?.id === id) {
          state.CaseDataDetails.documents.push(document[0]);
        }

        state.loadingDocuments = false;
      })
      .addCase(createDocument.pending, (state) => {
        state.loadingDocuments = true;
      })
      .addCase(createDocument.rejected, (state) => {
        state.loadingDocuments = false;
      })

      // createSession
      .addCase(createSession.fulfilled, (state, action) => {
        const session = action.payload;
        if (state.CaseDataDetails?.id == session.case_id) {
          state.CaseDataDetails.sessions.push(session);
        }

        state.loadingDocuments = false;
      })
      .addCase(createSession.pending, (state) => {
        state.loadingDocuments = true;
      })
      .addCase(createSession.rejected, (state) => {
        state.loadingDocuments = false;
      })

      // DeleteSession
      .addCase(DeleteSession.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.CaseDataDetails.sessions = state.CaseDataDetails.sessions.filter(
          (item) => item.id !== id,
        );

        state.loadingDocuments = false;
      })
      .addCase(DeleteSession.pending, (state) => {
        state.loadingDocuments = true;
      })
      .addCase(DeleteSession.rejected, (state) => {
        state.loadingDocuments = false;
      });
  },
});
export default CaseSlice.reducer;
