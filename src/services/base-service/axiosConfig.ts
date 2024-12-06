import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://3.0.183.56:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;