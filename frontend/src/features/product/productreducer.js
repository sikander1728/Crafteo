import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    iserror: "",
    message: "",
    resetmessage: "",
}

export const getAllProducts = createReducer(initialState, {
    getAllProductRequest: (state) => {
        state.loading = true;
    },
    getAllProductSuccess: (state, action) => {
        state.loading = false;
        state.product = action.payload;
    },
    getAllProductFailure: (state, action) => {
        state.loading = false;
        state.iserror += action.payload
    },
})

export const searchProductReducer = createReducer(initialState, {
    searchProductRequest: (state) => {
        state.loading = true;
    },
    searchProductSuccess: (state, action) => {
        state.loading = false;
        state.products = action.payload;
    },
    searchProductFailure: (state, action) => {
        state.loading = false;
        state.iserror += action.payload
    },
    resetSearch: (state) => {
        state.users = null;
    }
})