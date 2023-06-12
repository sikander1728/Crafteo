import { configureStore } from "@reduxjs/toolkit"
import { postReducer } from "./features/post/postReducer"
import {allUsersReducer, userReducer} from "./features/user/userReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        allUsers: allUsersReducer
    },
})