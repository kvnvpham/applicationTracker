import { useState } from "react";
import "./AuthForm.css";

export default function AuthForm({
    isRegister,
    loginUser,
    registerUser,
    isAuth,
}) {
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        checkPassword: "",
    });
    const [error, setError] = useState("");

    function handleOnChange(event) {
        const { name, value } = event.target;

        setCredentials((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    return (
        <div className="form-container">
            <h2>{isRegister ? "Register" : "Login"}</h2>
            {isRegister && (
                <input
                    onChange={handleOnChange}
                    type="text"
                    name="name"
                    value={credentials.name}
                    placeholder="Name"
                />
            )}
            <input
                onChange={handleOnChange}
                type="email"
                name="username"
                value={credentials.username}
                placeholder="Username (Email)"
            />
            <input
                onChange={handleOnChange}
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
            />
            {isRegister && (
                <input
                    onChange={handleOnChange}
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

                        if (!res) {
                            setError("Incorrect Username or Password.");
                        }
                    }
                }}
                className="submit-btn"
                name="submit"
            >
                {isRegister ? "Create Account" : "Sign In"}
            </button>
            <p className="error">{error}</p>
        </div>
    );
}
