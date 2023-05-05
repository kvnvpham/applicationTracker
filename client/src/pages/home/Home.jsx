import "./Home.css";

export default function Home({ isAuth }) {
    return (
        <div>
            <h1>
                {isAuth
                    ? "Welcome Back!"
                    : "Welcome To Your Application Tracker"}
            </h1>
            <p>
                This is a simple website that you can use to log all of your
                applications to keep track of!
            </p>
        </div>
    );
}
