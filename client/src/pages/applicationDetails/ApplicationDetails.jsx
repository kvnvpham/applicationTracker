import { Navigate } from "react-router-dom";
import "./ApplicationDetails.css";

export default function ApplicationDetails({ isAuth }) {
    return <>{!isAuth ? <Navigate to="/login" replace /> : <h2>Hello</h2>}</>;
}
