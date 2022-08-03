import {
    Routes,
    Route,
    NavLink,
    Link,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./navbar.module.scss";
import { logout } from "../../features/user/authSlice";

export default function Navbar() {
    const activeClassName = "active";
    const dispath = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.loggedInUser);
    const logoutUser = () => {
        dispath(logout());
        return navigate("/login");
    };
    return (
        <nav className={styles.nav}>
            <section className="container">
                <ul className={styles.ul}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? activeClassName : undefined
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/leaderboard"
                            className={({ isActive }) =>
                                isActive ? activeClassName : undefined
                            }
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/add"
                            className={({ isActive }) =>
                                isActive ? activeClassName : undefined
                            }
                        >
                            New
                        </NavLink>
                    </li>
                    <li className={styles.image}>
                        <img src={user.avatarURL} height="50" />

                        {user.name}
                    </li>
                    <li>
                        <button className={styles.logout} onClick={logoutUser}>
                            Logout
                        </button>
                    </li>
                </ul>
            </section>
        </nav>
    );
}
