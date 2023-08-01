import axios from "axios"
axios.defaults.withCredentials = true


//signin request 
export const SigninUser = (formValues) => async (dispatch) => {
    try {
        dispatch({
            type: "SigninRequest"
        })

        const { data } = await axios.post(
            process.env.REACT_APP_REQUEST_URL + "/api/signin",
            {
                email: formValues.email,
                password: formValues.password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        dispatch({
            type: "SigninSuccess",
            payload: data.user,

        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: "SigninFailure",
            payload: error.response.data.message
        })

    }
}

export const Signupuser = (formValues) => async (dispatch) => {
    try {
        dispatch({
            type: "SignupRequest",
        })

        await axios.post(
            process.env.REACT_APP_REQUEST_URL + "/api/signup",
            {
                email: formValues.email,
                name: formValues.name,
                username: formValues.username,
                password: formValues.password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "SignupSuccess",
            payload: "User Created Successfully"
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "SignupFailure",
            payload: error.response.data.message
        })
    }
}

//Load User request
export const LoadUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "LoadUserRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/users", {
            withCredentials: true,
        })

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

//forgot password request
export const forgotPassword = (resetValue) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotLoad"
        })

        const { data } = await axios.post(
            process.env.REACT_APP_REQUEST_URL + "/api/sendloginlink",
            { email: resetValue.email },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "forgotSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "forgotFailure",
            payload: error.response.data.message
        })
    }
}
// reset password link validity
export const verifyLink = (id, token) => async (dispatch) => {
    try {

        dispatch({
            type: "verifyLinkRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL +
            `/api/resetPassword/${id}/${token}`)

        if (data.authorizedUser) {
            dispatch({
                type: "verifyLinkSuccess",
                payload: data
            })
        }

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "veriyLinkFailure",
            payload: error.response.data.error.name
        })
    }
}

//reset password 
export const resetPassword = (formValues, id, token) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest",
        })

        await axios.post(
            process.env.REACT_APP_REQUEST_URL + `/api/${id}/${token}`,
            {
                password: formValues.password,
                againpassword: formValues.againpassword
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "resetPasswordSuccess",
            payload: "Password Reset Successfully"
        })

    } catch (error) {
        dispatch({
            type: "resetPasswordFailure",
            payload: error.response.data.message
        })
    }
}

export const UpdateProfile = (name, email, username, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "editProfileLoad",
        })
        await axios.put(
            process.env.REACT_APP_REQUEST_URL + "/api/updateProfile",
            {
                email, name, username, avatar
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "editProfileSuccess",
            payload: "Profile Updated"
        })

    } catch (error) {
        dispatch({
            type: "editProfileError",
            payload: error.response.data.message
        })
    }
}

//get all users
export const getAllUsers = () => async (dispatch) => {
    try {

        dispatch({
            type: "allUserRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/allUsers", {
            withCredentials: true,
        })

        dispatch({
            type: "allUserSuccess",
            payload: data.users
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "allUserFailure",
            payload: error.response.data.message
        })
    }
}

//logout User 
export const logoutUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "logoutUserRequest",
        })

        await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/logout", {
            withCredentials: true,
        })

        dispatch({
            type: "logoutUserSuccess"
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "logoutUserFailure",
            payload: error.response.data.message
        })
    }
}

export const folloUnfollow = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "followUserRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/followUnfollowUser`, {
            withCredentials: true,
        })

        dispatch({
            type: "followUserSuccess",
            payload: data.message
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message
        })
    }
}

export const searchUser = (query) => async (dispatch) => {
    try {
        dispatch({
            type: "searchUserRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/searchUser`,
            {
                params: { query },
                withCredentials: true
            },
            )

        dispatch({
            type: "searchUserSuccess",
            payload: data
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "searchUserFailure",
            payload: error.response.data.message
        })
    }
}

export const getSingleProfile = (username) => async (dispatch) => {
    try {
        dispatch({
            type: "singleUserRequest",
        })
        console.log(username)

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/userProfile/${username}`,
            {
                withCredentials: true
            },
            )

        dispatch({
            type: "singleUserSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "singleUserFailure",
            payload: error
        })
    }
}