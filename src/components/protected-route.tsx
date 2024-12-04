import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    exp: number;
    iat: number;
    sub: string;
}
const ProtectedRoute = () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        // If no token is found, redirect to the login page
        return <Navigate to="/login" />;
    }

    try {
        // Decode the JWT token
        const decodedToken: DecodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
            // Token is expired
            sessionStorage.removeItem('token'); // Optional: clear invalid token
            return <Navigate to="/login" />;
        }

        // Token is valid, so return the children route
        return <Outlet />;
    } catch {
        // If JWT decoding fails or any error happens, redirect to login
        sessionStorage.removeItem('token'); // Optional: clear invalid token
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
