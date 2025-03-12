import axios from "axios";
import { ApiError } from "./apiErrror";
import { store } from "./store/store";
import { logout } from "./store/userSlice";
import { toast } from "react-toastify";


const axiosInstance = axios.create({
    baseURL: 'https://cinemaguide.skillbox.cc/',
    timeout: 10000,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            store.dispatch(logout());
            toast.error("The session has expired, log in again.");
            sessionStorage.removeItem('auth')
           
            return
        }
        ApiError(error);
        // return Promise.reject(error);
    }
);

export default axiosInstance;