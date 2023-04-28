import BadgeIcon from "@mui/icons-material/Badge";
import { NavLink, Outlet } from "react-router-dom";
import "./AuthNav.css";

export default function NavBar({ isAuth }) {
    return (
        <>
            <div className="navbar">
                <header>
                    <BadgeIcon className="logo nav-style" />
                    <nav>
                        <NavLink className="nav-item nav-style" to="/">
                            Home
                        </NavLink>
                        {isAuth ? (
                            <>
                                <NavLink
                                    className="nav-item nav-style"
                                    to="/applications"
                                >
                                    Applications
                                </NavLink>
                                <NavLink
                                    className="nav-item nav-style"
                                    to="/logout"
                                >
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    className="nav-item nav-style"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className="nav-item nav-style"
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </nav>
                </header>
            </div>
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}
