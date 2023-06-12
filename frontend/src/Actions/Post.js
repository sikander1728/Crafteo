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