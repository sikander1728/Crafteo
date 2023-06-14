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

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/postsoffollowing",{
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

// LikeUnlike Reducer
export const likeandUnlike = (id) => async (dispatch) => {
    try {
        
        dispatch({
            type: "likeUnlikeRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/likeUnlike/${id}`,{
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
