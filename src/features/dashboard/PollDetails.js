import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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

    console.log(`alreadyAnswered: ${alreadyAnswered}`);

    const handleClick = (option) => {
        console.log(option);
        dispatch(
            saveQuestionAnswerAsync({
                qid: id,
                answer: option,
            })
        );
    };

    return (
        <div>
            <h3 className={styles.helpertext}>Would you rather</h3>
            <div className={styles.option_wrapper}>
                <button
                    className={
                        styles.option + " " + (op1 ? styles.selected : "")
                    }
                    onClick={() => handleClick("optionOne")}
                    disabled={alreadyAnswered}
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
