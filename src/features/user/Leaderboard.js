import { useSelector } from "react-redux";

import styles from "./Leaderboard.module.scss";

export default function LeaderboardTable() {
    const allusers = useSelector((state) => state.auth.allusers);
    const allQuestions = useSelector((state) => state.dashboard.questions);

    if (!allusers || !allQuestions) {
        return null;
    }

    const tempUser = {};

    Object.keys(allusers).forEach((key) => {
        tempUser[key] = {
            ...allusers[key],
            answers: [],
            questions: [],
        };
    });

    Object.keys(allQuestions).forEach((key) => {
        const q = allQuestions[key];
        const { id, author, optionOne, optionTwo } = q;

        tempUser[author].questions.push(id);

        optionOne.votes.forEach((vote) => {
            tempUser[vote].answers.push(id);
        });
        optionTwo.votes.forEach((vote) => {
            tempUser[vote].answers.push(id);
        });
    });

    const arr = Object.values(tempUser).sort((a, b) => {
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
