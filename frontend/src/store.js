import { configureStore } from "@reduxjs/toolkit"
import {userReducer} from "./features/user/userReducer"

export const store = configureStore({
    reducer: {
        user: userReducer
    },
})