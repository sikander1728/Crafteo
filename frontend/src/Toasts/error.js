import {toast} from 'react-toastify'

export const errorToast = (message) => {
    toast.error(message , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
}