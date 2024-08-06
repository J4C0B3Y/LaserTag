import toast, { Toaster, ToastOptions } from "react-hot-toast"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const options: ToastOptions = {
    position: "bottom-right",
    className: "border bg-notification text-primary font-semibold",
}

const NotificationProvider = () => {
    return <Toaster toastOptions={options} />
}

export const notify = toast

export default NotificationProvider
