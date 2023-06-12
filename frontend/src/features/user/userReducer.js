import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    iserror: "",
    message: "",
    resetmessage: "",
}

export const userReducer = createReducer(initialState, {
    SigninRequest: (state) => {
        state.loading = true;
        state.isauthenticated = false
    },
    SigninSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.message
        state.isauthenticated = true
    },
    SigninFailure: (state, action) => {
        state.loading = false;
        state.iserror += action.payload
        state.isauthenticated = false
    },

    SignupRequest: (state) => {
        state.loading = true;
        state.isauthenticated = false
    },
    SignupSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isauthenticated = true
    },
    SignupFailure: (state, action) => {
        state.loading = false;
        state.iserror += action.payload
        state.isauthenticated = false
    },
    ClearError: (state) => {
        state.iserror = ""
    },
    ClearSuccess: (state) => {
        state.message = ""
    },

    LoadUserRequest: (state) => {
        state.loading = true
        state.isauthenticated = false
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isauthenticated = true
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        // state.iserror = action.payload
        state.isauthenticated = false
    },

    forgotLoad: (state) => {
        state.loading = true
    },
    forgotSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotFailure: (state, action) => {
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
    veriyLinkFailure: (state, action) => {
        state.loading = false;
        state.linkerror += action.payload
    },

    resetPasswordRequest: (state) => {
        state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.resetmessage += action.payload;
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.iserror = action.payload
    },

    editProfileLoad: (state) => {
        state.loading = true;
    },
    editProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    editProfileError: (state, action) => {
        state.loading = false;
        state.iserror = action.payload; 
    },

    logoutUserRequest: (state) => {
        state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isauthenticated = false;
    },
    logoutUserFailure: (state, action) => {
        state.loading = false;
        state.iserror += action.payload
        state.isauthenticated = true;
    },
})

export const allUsersReducer = createReducer(initialState, {
    allUserRequest: (state) => {
        state.loading = true;
    },
    allUserSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allUserFailure: (state, action) => {
        state.loading = false;
        state.iserror += action.payload
    },
})
