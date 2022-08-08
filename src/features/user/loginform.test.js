import { render, fireEvent, screen } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "./Auth";

describe("LoginForm", () => {
    it("snapshot testing", () => {
        const view = render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </MemoryRouter>
        );

        expect(view).toMatchSnapshot();
    });

    it("should enter password in the form", async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Login/i)).toBeInTheDocument();

        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "password123" },
        });

        expect(screen.getByTestId("password-input").value).toBe("password123");
    });

    it("should submit the form", async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Login/i)).toBeInTheDocument();

        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "password123" },
        });

        fireEvent.change(screen.getByTestId("user-select-option"), {
            target: { value: "sarahedo" },
        });
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(await screen.findByText(/Authenticating/i)).toBeInTheDocument();
    });
});
