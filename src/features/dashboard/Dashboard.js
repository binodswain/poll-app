import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import { getQuestionsAsync, selectDashboardData } from "./dashboardSlice";

import styles from "./Dashboard.module.scss";

export function HomePageWidget() {
    const store = useSelector(selectDashboardData);
    const userid = useSelector((state) => state.auth.loggedInUser.id);
    const { questions } = store;
    console.log(questions, userid);
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

    return (
        <>
            <section className={styles.section}>
                <h2>New Questions</h2>
                <section className={styles.q_wrapper}>
                    {newQuestions.map((q) => (
                        <div key={q.id} className={styles.q_item}>
                            <h3>{q.author}</h3>
                            <p>{q.timestamp}</p>
                            <Link to={`/question/${q.id}`}>
                                <button className={styles.show}>Show</button>
                            </Link>
                        </div>
                    ))}
                </section>
            </section>
            <section className={styles.section}>
                <h2>Done Questions</h2>
                <section className={styles.q_wrapper}>
                    {doneQuestions.map((q) => (
                        <div key={q.id} className={styles.q_item}>
                            <h3>{q.author}</h3>
                            <p>{q.timestamp}</p>
                            <Link to={`/question/${q.id}`}>
                                <button className={styles.show}>Show</button>
                            </Link>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
}
