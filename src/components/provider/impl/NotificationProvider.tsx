import toast, { Toaster, ToastOptions } from "react-hot-toast"

const options: ToastOptions = {
    position: "bottom-right",
    className: "border bg-notification text-primary font-semibold",
}

const NotificationProvider = () => {
    return <Toaster toastOptions={options} />
}

export const notify = toast
export default NotificationProvider