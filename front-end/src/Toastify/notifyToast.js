import { toast } from "react-toastify";



export const notifyToast = (message, type = "error") => {


    switch (type) {

        case "success": {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
            break;
        }
        case "error": {
            toast.warn(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
            break;
        }
    }


};