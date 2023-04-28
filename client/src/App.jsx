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

    function getUser() {
        // Get User
    }

    function register(credentials) {
        if (
            credentials.name &&
            credentials.username &&
            credentials.password === credentials.checkPassword
        ) {
            axios({
                method: "post",
                url: "http://localhost:3000/register",
                data: credentials,
                withCredentials: true,
            });
        }
    }

    function login(credentials) {
        if (credentials.username && credentials.password) {
            axios({
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
