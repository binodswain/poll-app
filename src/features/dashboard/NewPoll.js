import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearNewPollBanner, saveQuestionAsync } from "./dashboardSlice";

import styles from "./NewPoll.module.scss";

export function NewPoll() {
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { newPoll } = useSelector((state) => state.dashboard);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (optionOne && optionTwo) {
            dispatch(
                saveQuestionAsync({
                    optionOneText: optionOne,
                    optionTwoText: optionTwo,
                })
            );
        }
    };

    useEffect(() => {
        dispatch(clearNewPollBanner());
    }, [dispatch]);

    useEffect(() => {
        if (newPoll.created) {
            return navigate("/");
        }
    }, [newPoll.created]);

    return (
        <div>
            <section className={styles.header}>
                <h1>Would you rather</h1>
                <p>Create Your Own Poll</p>
            </section>
            <section>
                {newPoll.created ? (
                    <div className={styles.success}>
                        <h3>Success! Your poll has been created.</h3>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Option 1
                        <input
                            className={styles.input}
                            type="text"
                            name="first_option"
                            value={optionOne}
                            onChange={(e) => setOptionOne(e.target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        Option 2
                        <input
                            className={styles.input}
                            type="text"
                            name="second_option"
                            value={optionTwo}
                            onChange={(e) => setOptionTwo(e.target.value)}
                        />
                    </label>
                    <button
                        disabled={!(optionOne && optionTwo) || newPoll.loading}
                        className={styles.submit}
                    >
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
}
