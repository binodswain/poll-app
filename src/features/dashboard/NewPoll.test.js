import { render, fireEvent, screen } from "@testing-library/react";
import { setupStore } from "../../app/store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import { NewPoll } from "./NewPoll";
import { _getQuestions } from "../../_DATA";

const mockStore = {
    auth: {
        loggedInUser: {
            id: "sarahedo",
            password: "password123",
            name: "Sarah Edo",
            avatarURL: "https://i.pravatar.cc/150?u=sarahedo@pravatar.com",
            answers: {
                "8xf0y6ziyjabvozdd253nd": "optionOne",
                "6ni6ok3ym7mf1p33lnez": "optionOne",
                am8ehyc8byjqgar0jgpub9: "optionTwo",
                loxhs1bqm25b708cmbf3g: "optionTwo",
            },
            questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
        },
        loading: false,
        authError: "",
        pollUserDetails: null,
        allusers: null,
    },
    dashboard: {
        loading: false,
        questions: null,
        newPoll: {
            loading: false,
            created: false,
        },
    },
};

describe("NewPoll", () => {
    let store;
    beforeEach(() => {
        store = setupStore(mockStore);
    });

    it("snapshot testing", () => {
        const view = render(
            <MemoryRouter>
                <Provider store={store}>
                    <NewPoll />
                </Provider>
            </MemoryRouter>
        );
        expect(view).toMatchSnapshot();
    });

    it("submits new poll", async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <NewPoll />
                </Provider>
            </MemoryRouter>
        );

        expect(
            await screen.findByText(/Would you rather/i)
        ).toBeInTheDocument();

        fireEvent.change(screen.getByTestId("first_option"), {
            target: { value: "option one" },
        });

        fireEvent.change(screen.getByTestId("second_option"), {
            target: { value: "option two" },
        });
        expect(Object.keys(await _getQuestions())).toHaveLength(6);

        fireEvent.click(screen.getByTestId("poll-submit-button"));

        expect(Object.keys(await _getQuestions())).toHaveLength(7);
    });
});
