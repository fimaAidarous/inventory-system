import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProductStart: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      if (!state.products) {
        state.products = []; 
      }
      state.products.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProductStart: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProductStart: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    productListStart: (state) => {
      state.loading = true;
    },
    productListSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    productListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const fetchProducts = () => async (dispatch) => {
  dispatch(productListStart());
  try {
    const response = await fetch("http://localhost:9000/api/products");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFailure(error.message));
  }
};

export const {
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  productListStart,
  productListSuccess,
  productListFailure,
} = productSlice.actions;

export default productSlice.reducer;
