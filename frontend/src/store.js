import { configureStore } from "@reduxjs/toolkit"
import { postReducer, postoffollowingReducer, likeUnlikeReducer, myPostsReducer, userPostsReducer } from "./features/post/postReducer"
import { allUsersReducer, getSingleUser, searchUserReducer, userReducer } from "./features/user/userReducer"
import { getAllProducts, searchProductReducer } from "./features/product/productreducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        allUsers: allUsersReducer,
        postoffollowing: postoffollowingReducer,
        myPosts: myPostsReducer,
        likeUnlike: likeUnlikeReducer,
        userSearch: searchUserReducer,
        singleUser: getSingleUser,
        userPosts: userPostsReducer,
        allProducts: getAllProducts,
        productSearch: searchProductReducer,
    },
})