import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsersAsync } from "../user/authSlice";
import { getQuestionsAsync, saveQuestionAnswerAsync } from "./dashboardSlice";

import styles from "./PollDetails.module.scss";

function getAlreadyAnswered(question, authedUser) {
    const { optionOne, optionTwo } = question;
    const op1 = optionOne.votes.includes(authedUser.id);
    const op2 = optionTwo.votes.includes(authedUser.id);
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const op1Percent = (optionOne.votes.length / totalVotes) * 100;
    const op2Percent = (optionTwo.votes.length / totalVotes) * 100;
    return { op1, op2, op1Percent, op2Percent, alreadyAnswered: op1 || op2 };
}

export function PollDetails() {
    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.dashboard);
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const { id } = useParams();

    useEffect(() => {
        if (!questions) {
            dispatch(getQuestionsAsync());
        }
    }, [questions]);

    if (!questions) {
        return null;
    }
    const question = questions[id];

    if (!question) {
        return null;
    }

    const { author, timestamp, optionOne, optionTwo } = question;

    const { alreadyAnswered, op1, op2, op1Percent, op2Percent } =
        getAlreadyAnswered(question, loggedInUser);

    const handleClick = (option) => {
        dispatch(
            saveQuestionAnswerAsync({
                qid: id,
                answer: option,
            })
        );
    };

    return (
        <div>
            <UserDetails author={author} timestamp={timestamp} />
            <h3 className={styles.helpertext}>Would you rather</h3>
            <div className={styles.option_wrapper}>
                <button
                    className={
                        styles.option + " " + (op1 ? styles.selected : "")
                    }
                    onClick={() => handleClick("optionOne")}
                    disabled={alreadyAnswered}
                    data-testid="poll-optionOne"
                >
                    {optionOne.text}
                    {alreadyAnswered && (
                        <span> - {op1Percent.toFixed(2)}%</span>
                    )}
                </button>
                <button
                    className={
                        styles.option + " " + (op2 ? styles.selected : "")
                    }
                    onClick={() => handleClick("optionTwo")}
                    disabled={alreadyAnswered}
                    data-testid="poll-optionTwo"
                >
                    {optionTwo.text}
                    {alreadyAnswered && (
                        <span> - {op2Percent.toFixed(2)}%</span>
                    )}
                </button>
            </div>
        </div>
    );
}

function UserDetails({ author, timestamp }) {
    const dispatch = useDispatch();
    const { allusers } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!allusers) {
            dispatch(getUsersAsync());
        }
    }, [allusers, dispatch]);

    if (!allusers) {
        return "loading...";
    }

    const user = allusers[author];
    const date = new Date(timestamp);

    return (
        <section className={styles.poll_user_wrapper}>
            <img src={user.avatarURL} alt={user.name} />
            <div className={styles.user_details}>
                <h3>Poll by: {user.name}</h3>
                <p>
                    Created on :{" "}
                    {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
        </section>
    );
}
