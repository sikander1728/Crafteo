import { createReducer } from "@reduxjs/toolkit";

const initialState = {
   posterror: "",
   postsuccess: "",
}

export const postReducer = createReducer(initialState, {
   newPostLoad: (state) => {
      state.loading = true
   },
   newPostSuccess: (state, action) => {
      state.loading = false;
      state.postsuccess += action.payload;
   },
   newPostFailure: (state, action) => {
      state.loading = false;
      state.posterror += action.payload
   },
   
   clearError: (state) => {
      state.posterror = null
   },
   clearSuccess: (state) => {
      state.postsuccess = null;
   }
})