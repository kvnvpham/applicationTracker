import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    const [isAuthorized, setAuthorized] = useState(false);

    async function getUser() {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/getUser",
            withCredentials: true,
        });
    }

    async function register(credentials) {
        if (
            credentials.name &&
            credentials.username &&
            credentials.password === credentials.checkPassword
        ) {
            if (credentials.password.length < 8) {
                return {
                    error: "Password is required to be 8 characters or longer.",
                };
            } else {
                const response = await axios({
                    method: "post",
                    url: "http://localhost:3000/register",
                    data: credentials,
                    withCredentials: true,
                });
                return response.data;
            }
        } else {
            return {
                error: "Please fill out all fields or ensure your password matches.",
            };
        }
    }

    async function login(credentials) {
        if (credentials.username && credentials.password) {
            await axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: credentials,
                withCredentials: true,
            });
        }
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AuthNav isAuth={isAuthorized} />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/login",
                    element: <Login loginUser={login} />,
                },
                {
                    path: "/register",
                    element: <Register registerUser={register} />,
                },
                {
                    path: "/applications",
                    element: <Applications />,
                },
                {
                    path: "/logout",
                    element: <Logout />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
