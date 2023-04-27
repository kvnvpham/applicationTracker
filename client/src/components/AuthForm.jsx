import { useState } from "react";

export default function AuthForm({ isRegister }) {
    // Pass onclick function from App --> AuthForm

    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        password: "",
        checkPassword: "",
    });

    function handleOnChange(event) {
        const { name, value } = event.target;

        console.log(credentials);

        setCredentials((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    return (
        <form method="post">
            {isRegister && (
                <input
                    onChange={handleOnChange}
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
            <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>
    );
}
