import { render, fireEvent, screen } from "@testing-library/react";
import { setupStore } from "../../app/store";
import { Provider } from "react-redux";

import Router, { MemoryRouter } from "react-router-dom";
import { PollDetails } from "./PollDetails";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

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

describe("PollDetails", () => {
    let store;
    beforeEach(() => {
        store = setupStore(mockStore);
    });

    it("snapshot testing", async () => {
        jest.spyOn(Router, "useParams").mockReturnValue({
            id: "xj352vofupe1dqz9emx13r",
        });

        const view = render(
            <MemoryRouter>
                <Provider store={store}>
                    <PollDetails />
                </Provider>
            </MemoryRouter>
        );

        expect(
            await screen.findByText(/Would you rather/i)
        ).toBeInTheDocument();

        expect(view).toMatchSnapshot();
    });

    it("shows options", async () => {
        jest.spyOn(Router, "useParams").mockReturnValue({
            id: "xj352vofupe1dqz9emx13r",
        });

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <PollDetails />
                </Provider>
            </MemoryRouter>
        );

        expect(
            await screen.findByText(/Would you rather/i)
        ).toBeInTheDocument();

        expect(screen.getByTestId("poll-optionOne").textContent).toBe(
            "deploy to production once every two weeks"
        );
        expect(screen.getByTestId("poll-optionTwo").textContent).toBe(
            "deploy to production once every month"
        );
    });
});
