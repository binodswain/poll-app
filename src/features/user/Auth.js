import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateAsync, clearLoginForm, getUsersAsync } from "./authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Auth.module.scss";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let [searchParams] = useSearchParams();

    const {
        authError: errorMessage,
        loggedInUser,
        allusers,
        loading,
    } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearLoginForm());
        if (username && password) {
            dispatch(authenticateAsync({ username, password }));
        }
    };

    useEffect(() => {
        if (!allusers) {
            dispatch(getUsersAsync());
        }
    }, [dispatch, allusers]);

    useEffect(() => {
        if (loggedInUser) {
            // redirect to dashboard
            dispatch(clearLoginForm());
            return navigate(searchParams.get("redirect") || "/");
        }
    }, [loggedInUser, navigate, dispatch, searchParams]);

    if (!allusers) {
        return "loading...";
    }

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
                    <select
                        value={username}
                        className={styles.input}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        data-testid="user-select-option"
                    >
                        <option value="">Select a user</option>
                        {allusers &&
                            Object.keys(allusers).map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
                    </select>
                </label>
                <label className={styles.label}>
                    password:
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value={password}
                        data-testid="password-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input
                    data-testid="submit-button"
                    className={styles.submit}
                    type="submit"
                    value={loading ? "Authenticating..." : "Submit"}
                    disabled={loading}
                />
            </form>
        </div>
    );
}
