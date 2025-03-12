import { AppDispatch } from "./store/store";
import { getMovies } from "./store/moviesSlice";
import { getGenres } from "./store/genresSlice";
import { login, updateFavorites } from "./store/userSlice";
import axiosInstance from "./api";
import { LoginData, RegisterData } from "./types";
import qs from "qs"; 

export const fetchRandom = async () => {
    const response = await axiosInstance.get(`movie/random`);
    return response.data
}

export const fetchTopMovies = async () => {
    const response = await axiosInstance.get(`movie/top10`);
    return response.data
}

export const fetchGetGenres = () => async (dispatch: AppDispatch) => {
    const response = await axiosInstance.get(`movie/genres`);
    dispatch(getGenres(response.data))
}

export const fetchAllMovie = () => async (dispatch: AppDispatch) => {
    const response = await axiosInstance.get(`movie`)
    dispatch(getMovies(response.data))
}

export const fetchGetMovie = async (id: string) => {
    const response = await axiosInstance.get(`movie/${id}`);
    return response.data
}

export const fetchReg = async (data: RegisterData) => {
    await axiosInstance.post(`user`, data);
}

export const fetchLogin = (data: LoginData) => async (dispatch: AppDispatch) => {
    await axiosInstance.post(`auth/login`, data)
    dispatch(fetchProfile())
}

export const fetchProfile = () => async (dispatch: AppDispatch) => {
    const response = await axiosInstance.get("profile");
    if (response) {
        dispatch(login(response.data));
    }
};

// export const fetchPostFavorites = (id: number) => async(dispatch: AppDispatch) => {
//     console.log(id)
//     const response = await axiosInstance.post('favorites', {id});
//     dispatch(updateFavorites(response.data))
// }
// export const fetchPostFavorites = (id: number) => async (dispatch: AppDispatch) => {
//     const params = new URLSearchParams();
//     params.append("id", id.toString());
//     console.log(params.toString())

//     const response = await axiosInstance.post("favorites", params, {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     dispatch(updateFavorites(response.data));
// };


// Убедитесь, что библиотека установлена

export const fetchPostFavorites = (id: number) => async (dispatch: AppDispatch) => {
    const data = qs.stringify({ id: id.toString() }); // Преобразуем объект в строку формата `application/x-www-form-urlencoded`

    console.log(data); // Посмотрите, что отправляется

    const response = await axiosInstance.post("favorites", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    console.log('cce')
    if (response) {
        dispatch(updateFavorites(response.data));
    }
    
};
