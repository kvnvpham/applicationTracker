import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UnauthorizedNav from "./components/authNav/UnauthorizedNav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// TODO: Handle Authentication Events

// const [loggedIn, setLoggedIn] = useState(false);

// function handleAuthentication() {
// 	setLoggedIn(prevValue => setLoggedIn(!prevValue))
// }

const authRouter = createBrowserRouter([
    {
        path: "/",
        element: <UnauthorizedNav />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={authRouter} />;
}
