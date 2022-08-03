import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "./authSlice";

import styles from "./Leaderboard.module.scss";

export default function LeaderboardTable() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersAsync());
    }, []);

    const allusers = useSelector((state) => state.auth.allusers);

    if (!allusers) {
        return null;
    }
    const arr = Object.values(allusers).sort((a, b) => {
        const aScore = Object.keys(a.answers).length + a.questions.length;
        const bScore = Object.keys(b.answers).length + a.questions.length;
        return bScore - aScore;
    });

    return (
        <>
            <h1 className={styles.title}>Leaderboard</h1>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Answered</th>
                            <th>Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <img
                                        src={user.avatarURL}
                                        alt={user.name}
                                        className={styles.avatar}
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{Object.keys(user.answers).length}</td>
                                <td>{user.questions.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
