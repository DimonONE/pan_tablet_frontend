import axios from "axios";
import { getToken } from "../../store/actions/login";

export const Axios = axios.create();

Axios.interceptors.request.use(config => {

    const baseUrl = `${process.env.REACT_APP_BASE_URL}${config.url}`;

    const token: string = getToken();

    const updatedConfig = {
        ...config,
        url: baseUrl,
        headers: token && {
            'X-Authorization': token
        }
    };

    return updatedConfig;
}, error => {
    return Promise.reject(error);
});
