import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: [],
  error: null,
  loading: false,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    createSupplierStart: (state) => {
      state.loading = true;
    },
    createSupplierSuccess: (state, action) => {
      state.suppliers.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createSupplierFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSupplierStart: (state) => {
      state.loading = true;
    },
    updateSupplierSuccess: (state, action) => {
      const index = state.suppliers.findIndex(
        (supplier) => supplier._id === action.payload._id
      );
      state.suppliers[index] = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateSupplierFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSupplierStart: (state) => {
      state.loading = true;
    },
    deleteSupplierSuccess: (state, action) => {
      state.suppliers = state.suppliers.filter(
        (supplier) => supplier._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteSupplierFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    SupplierListStart: (state) => {
      state.loading = true;
    },
    SupplierListSuccess: (state, action) => {
      state.suppliers = action.payload;
      state.loading = false;
      state.error = null;
    },
    SupplierListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchSuppliers = () => async (dispatch) => {
  dispatch(SupplierListStart());
  try {
    const response = await fetch("http://localhost:9000/api/supplier"); // Ensure this URL is correct
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch suppliers");
    }
    dispatch(SupplierListSuccess(data)); // Dispatch success action with data
  } catch (error) {
    dispatch(SupplierListFailure(error.message)); // Dispatch failure action with error
  }
};

export const {
  createSupplierStart,
  createSupplierSuccess,
  createSupplierFailure,
  updateSupplierStart,
  updateSupplierSuccess,
  updateSupplierFailure,
  deleteSupplierStart,
  deleteSupplierSuccess,
  deleteSupplierFailure,
  SupplierListStart,
  SupplierListSuccess,
  SupplierListFailure,
} = supplierSlice.actions;

export default supplierSlice.reducer;
