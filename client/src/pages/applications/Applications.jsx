import "./Applications.css";
import { Navigate } from "react-router-dom";

export default function Applications({ isAuth }) {
    return <>{!isAuth ? <Navigate to="/login" replace /> : <h2>Hello</h2>}</>;
}
