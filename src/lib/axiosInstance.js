import axios from 'axios';


const axiosInstance = axios.create({
	baseURL: "https://intelli-chat.tech/api",
    headers: {
        'Content-Type': 'application/json',

    },
});


export default axiosInstance;
