import {toast} from 'react-toastify'

export const successToast = (message) => {
    toast.success(`🦄 ${message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}