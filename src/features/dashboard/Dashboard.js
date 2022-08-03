import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectDashboardData } from "./dashboardSlice";

import styles from "./Dashboard.module.scss";

const filterByTimestamp = (a, b) => {
    return b.timestamp - a.timestamp;
};

export function HomePageWidget() {
    const store = useSelector(selectDashboardData);
    const userid = useSelector((state) => state.auth.loggedInUser.id);
    const { questions } = store;
    const newQuestions = [];
    const doneQuestions = [];
    if (!questions || !userid) {
        return null;
    }

    Object.keys(questions).forEach((key) => {
        const q = questions[key];
        const { optionOne, optionTwo } = q;
        const selectedOne = optionOne.votes.includes(userid);
        const selectedTwo = optionTwo.votes.includes(userid);
        if (selectedOne || selectedTwo) {
            doneQuestions.push(q);
        } else {
            newQuestions.push(q);
        }
    });

    const NewQuestions = (
        <section className={styles.q_wrapper}>
            {newQuestions.sort(filterByTimestamp).map((q) => (
                <QuestionMarkup q={q} key={q.id} />
            ))}
        </section>
    );

    const DoneQuestions = (
        <section className={styles.q_wrapper}>
            {doneQuestions.sort(filterByTimestamp).map((q) => (
                <QuestionMarkup q={q} key={q.id} />
            ))}
        </section>
    );

    return (
        <>
            <ViewToggle
                NewQuestions={NewQuestions}
                DoneQuestions={DoneQuestions}
                newCount={newQuestions.length}
                doneCount={doneQuestions.length}
            />
        </>
    );
}

function ViewToggle(props) {
    const [view, setView] = useState("new");

    const { NewQuestions, DoneQuestions, newCount, doneCount } = props;

    return (
        <section className={styles.section}>
            <div className={styles.button_grp}>
                <button
                    onClick={() => setView("new")}
                    className={view === "new" ? styles.selected : ""}
                >
                    New Questions ({newCount})
                </button>
                <button
                    onClick={() => setView("done")}
                    className={view === "done" ? styles.selected : ""}
                >
                    Done Questions ({doneCount})
                </button>
            </div>
            {view === "new" ? NewQuestions : DoneQuestions}
        </section>
    );
}

function QuestionMarkup({ q }) {
    const date = new Date(q.timestamp);
    return (
        <div key={q.id} className={styles.q_item}>
            <h3>{q.author}</h3>
            <p>
                {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
            <Link to={`/questions/${q.id}`}>
                <button className={styles.show}>Show</button>
            </Link>
        </div>
    );
}
