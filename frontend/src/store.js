import { configureStore } from "@reduxjs/toolkit"
import { postReducer , postoffollowingReducer, likeUnlikeReducer} from "./features/post/postReducer"
import {allUsersReducer, userReducer} from "./features/user/userReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        allUsers: allUsersReducer,
        postoffollowing: postoffollowingReducer,
        likeUnlike: likeUnlikeReducer,
    },
})