import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  error: null,
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategoryStart: (state) => {
      state.loading = true;
    },
    createCategorySuccess: (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateCategoryStart: (state) => {
      state.loading = true;
    },
    updateCategorySuccess: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      state.categories[index] = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteCategoryStart: (state) => {
      state.loading = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    categoryListStart: (state) => {
      state.loading = true;
    },
    categoryListSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    categoryListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(categoryListStart());
  try {
    const response = await fetch("http://localhost:9000/api/categories");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch categories");
    }
    dispatch(categoryListSuccess(data));
  } catch (error) {
    dispatch(categoryListFailure(error.message));
  }
};

export const {
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  categoryListStart,
  categoryListSuccess,
  categoryListFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
