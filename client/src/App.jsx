import { useEffect, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import AuthNav from "./components/authNav/AuthNav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Applications from "./pages/applications/Applications";
import Logout from "./pages/logout/Logout";

// TODO: Handle Authentication Events

export default function App() {
    const [isAuthorized, setAuthorized] = useState(null);

    useEffect(() => {
        getUser().then((res) => setAuthorized(res.data.id));
    });

    async function getUser() {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/get-user",
            withCredentials: true,
        });
        return response;
    }

    async function register(credentials) {
        if (
            credentials.name &&
            credentials.username &&
            credentials.password === credentials.checkPassword
        ) {
            if (credentials.password.length < 8) {
                return {
                    error: "Please ensure password is at least 8 characters long.",
                };
            } else {
                const response = await axios({
                    method: "post",
                    url: "http://localhost:3000/register",
                    data: credentials,
                    withCredentials: true,
                });
                if (response.data === "Register Success.") {
                    const user = await getUser();
                    setAuthorized(user.data.id);
                    return { error: null };
                }
                return { error: "User Already Exists. Please Login." };
            }
        } else {
            return {
                error: "Please fill out all fields and ensure passwords match.",
            };
        }
    }

    async function login(credentials) {
        if (credentials.username && credentials.password) {
            try {
                const response = await axios({
                    method: "post",
                    url: "http://localhost:3000/login",
                    data: credentials,
                    withCredentials: true,
                });

                if (response.data === "Login Success.") {
                    const user = await getUser();
                    setAuthorized(user.data.id);
                    return { error: null };
                }
            } catch (e) {
                console.log(e);
                return { error: "Incorrect Username or Password." };
            }
            
        } else {
            return { error: "Incorrect credentials." };
        }
    }

    async function logout() {
        try {
            const response = await axios({
                method: "get",
                url: "http://localhost:3000/logout",
                withCredentials: true,
            })
            
            setAuthorized(null);
        } catch(e) {
            console.log(e);
        }
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AuthNav isAuth={isAuthorized} isLoggingOut={logout} />,
            children: [
                {
                    path: "/",
                    element: <Home isAuth={isAuthorized} />,
                },
                {
                    path: "/login",
                    element: <Login loginUser={login} isAuth={isAuthorized} />,
                },
                {
                    path: "/register",
                    element: (
                        <Register
                            registerUser={register}
                            isAuth={isAuthorized}
                        />
                    ),
                },
                {
                    path: "/applications",
                    element: <Applications isAuth={isAuthorized} />,
                },
                {
                    path: "/logout",
                    element: (
                        <Logout isAuth={isAuthorized} setAuth={setAuthorized} />
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
