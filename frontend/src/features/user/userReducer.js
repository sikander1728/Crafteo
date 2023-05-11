import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    resetmessage: "",
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
        state.iserror = action.payload
        state.isauthenticated = false
    },

    SignupRequest: (state ) =>{
        state.loading = true;
    },
    SignupSuccess: (state,action) =>{
        state.loading = false;
        state.user = action.payload;
    },
    SignupFailure: (state,action) =>{
        state.loading = false;
        state.iserror = action.payload;
    },
    
    ClearError: (state) =>{
        state.iserror = ""
    },

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

    forgotLoad: (state) => {
        state.loading = true
    },
    forgotSuccess: (state, action) => {
        state.loading = false;
        state.message += action.payload;
    },
    forgotFailure: (state,action) => {
        state.loading = false;
        state.iserror = action.payload
    },

    verifyLinkRequest: (state) => {
        state.loading = true
    },
    verifyLinkSuccess: (state, action) => {
        state.loading = false;
        state.message += action.payload;
    },
    veriyLinkFailure: (state,action) => {
        state.loading = false;
        state.linkerror = action.payload
    },

    resetPasswordRequest: (state) => {
        state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.resetmessage += action.payload;
    },
    resetPasswordFailure: (state,action) => {
        state.loading = false;
        state.iserror = action.payload
    }
})
