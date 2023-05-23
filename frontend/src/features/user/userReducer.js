import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    iserror: "",
}

export const userReducer = createReducer(initialState, {
    SigninRequest: (state ) =>{
        state.loading = true;
        state.isauthenticated = false
    },
    SigninSuccess: (state,action) =>{
        state.loading = false;
        state.user = action.payload;
        state.message = action.message
        state.isauthenticated = true
    },
    SigninFailure: (state,action) =>{
        state.loading = false;
        state.iserror += action.payload
        state.isauthenticated = false
    },

    SignupRequest: (state ) =>{
        state.loading = true;
        state.isauthenticated = false
    },
    SignupSuccess: (state,action) =>{
        state.loading = false;
        state.user = action.payload;
        state.isauthenticated = true
    },
    SignupFailure: (state,action) =>{
        state.loading = false;
        state.iserror += action.payload
        state.isauthenticated = false
    },
    ClearError: (state) =>{
        state.iserror = ""
    },
    // ClearSuccess: (state) => {
    //     state.user = {}
    // },

    LoadUserRequest: (state) => {
        state.loading = true
        state.isauthenticated = false
    },
    LoadUserSuccess: (state,action) => {
        state.loading = false;
        state.user = action.payload
        state.isauthenticated = true
    },
    LoadUserFailure: (state,action) => {
        state.loading = false;
        state.iserror = action.payload
        state.isauthenticated = false
    },

    ResetLoad: (state) => {
        state.loading = true
    },
    ResetSuccess: (state, action) => {
        state.loading = false;
        state.resetPassword = action.payload;
    },
    ResetFailure: (state,action) => {
        state.loading = false;
        state.iserror = action.payload
    }
})
