import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [], 
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    createStoreStart: (state) => {
      state.loading = true;
    },
    createStoreSuccess: (state, action) => {
      if (!state.stores) {
        state.stores = [];
      }
      state.stores.push(action.payload); 
      state.loading = false;
      state.error = null;
    },
    createStoreFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStoreStart: (state) => {
      state.loading = true;
    },
    updateStoreSuccess: (state, action) => {
      const index = state.stores.findIndex(
        (store) => store.productId === action.payload.productId
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateStoreFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStoreStart: (state) => {
      state.loading = true;
    },
    deleteStoreSuccess: (state, action) => {
      state.stores = state.stores.filter(
        (store) => store.productId !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteStoreFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    storeListStart: (state) => {
      state.loading = true;
    },
    storeListSuccess: (state, action) => {
      state.stores = action.payload; 
      state.loading = false;
      state.error = null;
    },
    storeListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


export const fetchStores = () => async (dispatch) => {
  dispatch(storeListStart());
  try {
    const response = await fetch("http://localhost:9000/api/stores"); 
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch stores");
    }
    dispatch(storeListSuccess(data));
  } catch (error) {
    dispatch(storeListFailure(error.message));
  }
};

export const {
  createStoreStart,
  createStoreSuccess,
  createStoreFailure,
  updateStoreStart,
  updateStoreSuccess,
  updateStoreFailure,
  deleteStoreStart,
  deleteStoreSuccess,
  deleteStoreFailure,
  storeListStart,
  storeListSuccess,
  storeListFailure,
} = storeSlice.actions;

export default storeSlice.reducer;
