import AuthForm from "../../components/authForm/AuthForm"

export default function Register({ registerUser }) {
    return <AuthForm isRegister={true} registerUser={registerUser} />;
}
