import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestionAsync } from "./dashboardSlice";

import styles from "./NewPoll.module.scss";

export function NewPoll() {
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const dispatch = useDispatch();
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

    return (
        <div>
            <section className={styles.header}>
                <h1>Would you rather</h1>
                <p>Create Your Own Poll</p>
            </section>
            <section>
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
                        disabled={!(optionOne && optionTwo)}
                        className={styles.submit}
                    >
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
}
