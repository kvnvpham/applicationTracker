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
    const [isAuthorized, setAuthorized] = useState("");

    useEffect(() => {
        getUser().then((res) => setAuthorized(res.data.id));
    });

    async function getUser() {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/getUser",
            withCredentials: true,
        });
        return response;
    }

    function register(credentials) {
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
                axios({
                    method: "post",
                    url: "http://localhost:3000/register",
                    data: credentials,
                    withCredentials: true,
                }).then((response) => {
                    if (response.data === "Register Success.") {
                        getUser().then((res) => setAuthorized(res.data.id));
                        return { error: null };
                    }
                });
            }
        } else {
            return {
                error: "Please fill out all fields and ensure passwords match.",
            };
        }
    }

    function login(credentials) {
        if (credentials.username && credentials.password) {
            axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: credentials,
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data === "Login Success.") {
                        getUser().then((res) => setAuthorized(res.data.id));
                    }
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        } else {
            return false;
        }
    }

    function logout() {
        axios({
            method: "get",
            url: "http://localhost:3000/logout",
            withCredentials: true,
        })
            .then((response) => {
                setAuthorized("");
            })
            .catch((err) => console.log(err));
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
