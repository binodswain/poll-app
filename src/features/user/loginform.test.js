import { render, fireEvent } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./Auth";

describe("LoginForm", () => {
    it("snapshot testing", () => {
        const comp = render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        );

        expect(comp).toMatchSnapshot();
    });
});
