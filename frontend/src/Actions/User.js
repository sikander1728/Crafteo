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
            message: data.message

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

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/users",{
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

//Reset password request
export const Resetpassword = (resetValue) => async (dispatch) => {
    try {
        dispatch({
            type: "ResetLoad"
        })

        await axios.post(
            process.env.REACT_APP_REQUEST_URL + "/api/sendloginlink",
            {email: resetValue.email},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "ResetSuccesss",
            payload: "We've sent an email to you with a link to get back into your account."
        })

    } catch (error) {
        dispatch({
            type: "ResetFailure",
            payload: error.response
        })
    }
}