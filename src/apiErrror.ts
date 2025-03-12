import { toast } from "react-toastify";

let isOfflineAlertShown = false;

export const ApiError = (error: any) => {
    if (!window.navigator.onLine) {
        if (!isOfflineAlertShown) {
            toast.error("Нет соединения с интернетом!", { theme: "colored" });
            isOfflineAlertShown = true;
        }
    } else if (error.response) {
        console.log(error.response.data.error)
        toast.error( "Server error", { theme: "colored" });
        console.log('fdfd')
    } else {
        toast.error("Unknown error", { theme: "colored" });
    }
};

// Сбрасываем флаг при восстановлении интернета
window.addEventListener("online", () => {
    isOfflineAlertShown = false;
});