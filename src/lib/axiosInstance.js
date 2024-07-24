import axios from 'axios';
import config from "@/lib/config"

const {API_BASE_URL} = config;

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;