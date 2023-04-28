import { useState } from "react";
import "./AuthForm.css";

export default function AuthForm({ isRegister, loginUser, registerUser }) {
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        checkPassword: "",
    });

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
                placeholder="Username"
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
                onClick={() => {
                    if (isRegister) {
                        registerUser(credentials);
                    } else {
                        loginUser(credentials);
                    }
                }}
                type="submit"
                name="submit"
            >
                {isRegister ? "Create Account" : "Sign In"}
            </button>
        </div>
    );
}
