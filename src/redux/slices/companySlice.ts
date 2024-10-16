import { company } from "@/api/services/company.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompanyState {
  data: {
    companyName: string;
    companySlug: string;
    industry: string;
    phone: string;
    email: string;
    password: string;
    logo: string;
    description: string;
    foundedDate?: Date;
    orderNo?: string;
    orderDate?: Date;
    plan?: string;
    serviceStatus?: string;
    paymentId?: string;
    createdAt?: Date;
    expiryDate?: Date;
  } | null;
  loading: boolean;
  error: string | null;
}
// Initial state
export const initialState: CompanyState = {
  data: null,
  loading: false,
  error: null,
};
// Action to fetch company data
export const fetchCompanyData = createAsyncThunk(
  '/c/:domainName/profile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await company.getCompanyInfo();
      console.log('companySlice',data)
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch company data");
    }
  }
);
// Create Slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompanyError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch company data
    builder.addCase(fetchCompanyData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCompanyData.fulfilled,
      (state, action: PayloadAction<CompanyState["data"]>) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      fetchCompanyData.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string | null;
      }
    );

  },
});

export const { clearCompanyError } = companySlice.actions;
export default companySlice.reducer;
