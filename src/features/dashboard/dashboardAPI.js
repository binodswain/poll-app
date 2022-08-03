import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

export async function getQuestions(userid) {
    const questions = await _getQuestions();
    return questions;
}

export async function saveQuestion(payload) {
    console.log(payload);
    const question = await _saveQuestion(payload);
    return question;
}

export async function saveQuestionAnswer({ authedUser, qid, answer }) {
    const question = await _saveQuestionAnswer({ authedUser, qid, answer });
    return question;
}
