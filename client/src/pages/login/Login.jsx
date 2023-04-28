import AuthForm from "../../components/authForm/AuthForm"

export default function Login({ loginUser }) {
    return <AuthForm isRegister={false} loginUser={loginUser} />;
}
