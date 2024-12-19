import React, {useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {bg_blue_600, bg_blue_800} from "../common/constant.ts";
import {UserService} from "../services/UserService.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!username) {
                toast.error("User name must not be empty");
                return;
            }
            if (!password) {
                toast.error("Password must not be empty");
                return;
            }
            await UserService.login(username, password);
            const token = sessionStorage.getItem('token');

            // If the token is not found or invalid, redirect to the login page
            if (token) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center py-10 bg-gray-100 h-screen">
            <Container>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        margin: "0 auto",
                        padding: 3,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography variant="h5" component="h1" className="text-center pb-10" sx={{ fontWeight: 'bold' }}>
                        H2FastFood
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Tên đăng nhập"
                            variant="outlined"
                            fullWidth
                            sx={{
                                paddingBottom: "0.75rem",
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            variant="outlined"
                            fullWidth
                            sx={{
                                paddingBottom: "0.75rem",
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            sx={{
                                fontWeight: "bold",
                                padding: "0.75rem",
                                textTransform: "none",
                                backgroundColor: bg_blue_600,
                                "&:hover": {
                                    backgroundColor: bg_blue_800,
                                },
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default LoginPage