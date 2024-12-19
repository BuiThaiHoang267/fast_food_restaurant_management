import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://52.221.203.133:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;