import axios from "axios"

export const getProducts = () => async (dispatch) => {
    try {

        dispatch({
            type: "getAllProductRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + "/api/allProducts", {
            withCredentials: true,
        })

        dispatch({
            type: "getAllProductSuccess",
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: "getAllProductFailure",
            payload: error.response.data.message
        })
    }
}

export const searchProduct = (query) => async (dispatch) => {
    try {
        dispatch({
            type: "searchProductRequest",
        })

        const { data } = await axios.get(process.env.REACT_APP_REQUEST_URL + `/api/searchProduct`,
            {
                params: { query },
                withCredentials: true
            },
            )

        dispatch({
            type: "searchProductSuccess",
            payload: data
        })

    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({
            type: "searchProductFailure",
            payload: error.response.data.message
        })
    }
}