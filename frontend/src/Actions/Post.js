import axios from "axios"

export const createNewPost = (caption, image) => async (dispatch) => {
    try {
        dispatch({
            type: "newPostLoad"
        })

        const { data } = await axios.post(
            process.env.REACT_APP_REQUEST_URL + "/api/createpost",
            {
                caption,
                image
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        console.log(data.message)
        dispatch({
            type: "newPostSuccess",
            payload: data.message
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: "newPostFailure",
            message: error.response.data.message
        })
    }
}

// get post of following
export const getPostofFollowing = () => async (dispatch) => {
    try {

        dispatch({
            type: "postoffollowingRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/postsoffollowing", {
            withCredentials: true,
        })

        dispatch({
            type: "postoffollowingSuccess",
            payload: data.posts
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "postoffollowingFailure",
            payload: error.response.data.message
        })
    }
}

export const getMyPosts = () => async (dispatch) => {
    try {

        dispatch({
            type: "myPostRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/myPosts", {
            withCredentials: true,
        })

        dispatch({
            type: "myPostSuccess",
            payload: data.posts
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "myPostFailure",
            payload: error.response.data.message
        })
    }
}

export const getUserPosts = (username) => async (dispatch) => {
    try {

        dispatch({
            type: "userPostRequest",
        })
        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/userPosts/${username}`, {
            withCredentials: true,
        })

        dispatch({
            type: "userPostSuccess",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "userPostFailure",
            payload: error.response.data.message
        })
    }
}

// LikeUnlike Reducer
export const likeandUnlike = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "likeUnlikeRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/likeUnlike/${id}`, {
            withCredentials: true,
        })

        dispatch({
            type: "likeUnlikeSuccess",
            payload: data.message
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "likeUnlikeFailure",
            payload: error.response.data.message
        })
    }
}


