import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateAsync } from "./authSlice";
import { useNavigate } from "react-router-dom";

import styles from "./Auth.module.scss";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authError: errorMessage, loggedInUser } = useSelector(
        (state) => state.auth
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authenticateAsync({ username, password }));
    };

    useEffect(() => {
        if (loggedInUser) {
            // redirect to dashboard
            return navigate("/");
        }
    }, [loggedInUser]);

    return (
        <div>
            <h1 className={styles.title}>Login</h1>

            <form onSubmit={handleSubmit} className={styles.loginform}>
                {errorMessage && (
                    <p data-testid="error-message" className={styles.error}>
                        {errorMessage}
                    </p>
                )}
                <label className={styles.label}>
                    username:
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    password:
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input
                    data-testid="submit-button"
                    className={styles.submit}
                    type="submit"
                    value="Login"
                />
            </form>
        </div>
    );
}
