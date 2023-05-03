import { useState } from "react";
import "./AuthForm.css";

export default function AuthForm({ isRegister, loginUser, registerUser }) {
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        checkPassword: "",
    });
    const [error, setError] = useState("");

    function handleOnChange(event) {
        const { name, value } = event.target;

        if (name === "username" && !value.includes("@")) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
        }

        setCredentials((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    return (
        <div className="form-container">
            <h2 className="auth-title">{isRegister ? "Register" : "Login"}</h2>
            {isRegister && (
                <input
                    autoFocus={isRegister}
                    onChange={handleOnChange}
                    className="login"
                    type="text"
                    name="name"
                    value={credentials.name}
                    placeholder="Name"
                />
            )}
            <input
                autoFocus={!isRegister}
                onChange={handleOnChange}
                className="login"
                type="email"
                name="username"
                value={credentials.username}
                placeholder="Username (Email)"
            />
            <input
                onChange={handleOnChange}
                className="login"
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
            />
            {isRegister && (
                <input
                    onChange={handleOnChange}
                    className="login"
                    type="password"
                    name="checkPassword"
                    value={credentials.checkPassword}
                    placeholder="Re-enter Password"
                />
            )}
            <button
                onClick={async () => {
                    if (isRegister) {
                        const res = await registerUser(credentials);

                        if (res.error) {
                            setError(res.error);
                        }
                    } else {
                        const res = await loginUser(credentials);

                        if (res.error) {
                            setError(res.error);
                        }
                    }
                }}
                type="submit"
                className="login-btn"
                name="submit"
            >
                {isRegister ? "Create Account" : "Sign In"}
            </button>
            <p className="error">{error}</p>
        </div>
    );
}
