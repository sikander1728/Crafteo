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

export const postoffollowingReducer = createReducer(initialState, {
   postoffollowingRequest: (state) => {
       state.loading = true;
   },
   postoffollowingSuccess: (state, action) => {
       state.loading = false;
       state.posts = action.payload;
   },
   postoffollowingFailure: (state, action) => {
       state.loading = false;
       state.iserror = action.payload
   },
   ClearErrors: (state,action) => {
       state.iserror = null
   }
})

export const myPostsReducer = createReducer(initialState, {
   myPostRequest: (state) => {
       state.loading = true;
   },
   myPostSuccess: (state, action) => {
       state.loading = false;
       state.posts = action.payload;
   },
   myPostFailure: (state, action) => {
       state.loading = false;
       state.iserror = action.payload
   },
   ClearErrors: (state,action) => {
       state.iserror = null 
   }
})

export const userPostsReducer = createReducer(initialState, {
    userPostRequest: (state) => {
        state.loading = true;
    },
    userPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    userPostFailure: (state, action) => {
        state.loading = false;
        state.iserror = action.payload
    },
    ClearErrors: (state,action) => {
        state.iserror = null 
    }
 })

export const likeUnlikeReducer = createReducer(initialState, {
   likeUnlikeRequest: (state) => {
       state.loading = true;
   },
   likeUnlikeSuccess: (state, action) => {
       state.loading = false;
       state.message = action.payload;
   },
   likeUnlikeFailure: (state, action) => {
       state.loading = false;
       state.iserror += action.payload
   },
   ClearErrors: (state,action) => {
       state.iserror = null
   },
   ClearMessage: (state,action) => {
      state.message = null
  }
})
