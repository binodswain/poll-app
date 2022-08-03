import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("Fake  data store", () => {
    it("will return formatted question for valid input", async () => {
        var result = await _saveQuestion({
            optionOneText: "optionOneText",
            optionTwoText: "optionTwoText",
            author: "author",
        });
        expect(result.id).toBeDefined();
        expect(result.timestamp).toBeDefined();
    });

    it("will return error question for invalid input", async () => {
        await expect(
            _saveQuestion({
                optionOneText: "optionOneText",
                author: "author",
            })
        ).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        );
    });

    it("will save answer and question for valid input", async () => {
        var result = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "6ni6ok3ym7mf1p33lnez",
            answer: "optionOne",
        });
        expect(result).toEqual(true);
    });

    it("will return error while saving answer and question for invalid input", async () => {
        await expect(
            _saveQuestionAnswer({
                authedUser: "sarahedo",
                answer: "optionOne",
            })
        ).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
});
