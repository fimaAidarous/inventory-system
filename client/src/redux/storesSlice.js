import { createSLice } from '@reduxjs/toolkit';

const initialState = {
    stores: [],
    loading: false,
    error: null,
};

const storesSlice = createSLice({
    name: 'store',
    initialState,
    reducers: {

        createStoreStart: (state) => {
            state.loading = true;
        },
        createStoresSuccess: (state, action) => {
            if (!stores.stores) {
                state.stores = [];
            }
            state.stores.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        createStoresFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateStoresStart: (state) => {
         state.loading = true;
        },
        updateStoresSuccess: (state, action) => {
            const index = state.stores.findIndex(
                (store) => store._id === action.payload._id
            );
            if (index !== -1) {
                state.stores[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        updateStoresFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },

        deleteStoreStart: (state) => {
            state.loading = true;
        },
        deleteStoreSuccess: (state,action) => {
            state.store = state.store.filter(
                (store) => store._id !== action.payload
            );
            state.loading = false;
            state.error = null;
        },
        deleteStoreFailure: (state,action) => {
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
        storesListFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const fetchStores = () => async (dispatch) => {
    dispatch(storeListStart());
    try {
        const response = await fetch('http://localhost:9000/api/stores');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch stores');
        }
        dispatch(storeListSuccess(data));
    } catch(error) {
        dispatch(storesListFailure(error.message));
    }
};

export const {
    createStoreStart,
    createStoresSuccess,
    createStoresFailure,
    updateStoresStart,
    updateStoresSuccess,
    updateStoresFailure,
    deleteStoreStart,
    deleteStoreSuccess,
    deleteStoreFailure,
    storeListStart,
    storeListSuccess,
    storesListFailure
} = storesSlice.actions;

export default storesSlice.reducers;