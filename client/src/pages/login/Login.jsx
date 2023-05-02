import AuthForm from "../../components/authForm/AuthForm";
import { Navigate } from "react-router-dom";

export default function Login({ loginUser, isAuth }) {
    return (
        <>
            {isAuth ? (
                <Navigate to="/applications" replace />
            ) : (
                <AuthForm
                    isRegister={false}
                    loginUser={loginUser}
                    isAuth={isAuth}
                />
            )}
        </>
    );
}
