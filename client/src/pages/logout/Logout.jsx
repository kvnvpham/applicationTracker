import { Navigate } from "react-router-dom";
import "./Logout.css";

export default function Logout({ isAuth }) {
    return (
        <>
            {isAuth ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
        </>
    );
}
