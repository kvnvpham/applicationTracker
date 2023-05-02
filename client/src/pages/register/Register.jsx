import AuthForm from "../../components/authForm/AuthForm";
import { Navigate } from "react-router-dom";

export default function Register({ registerUser, isAuth }) {
    return (
        <>
            {isAuth ? (
                <Navigate to="/applications" replace />
            ) : (
                <AuthForm isRegister={true} registerUser={registerUser} isAuth={isAuth} />
            )}
        </>
    );
}
