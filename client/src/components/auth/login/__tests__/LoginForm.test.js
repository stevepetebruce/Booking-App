import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LoginForm from "../LoginForm";

// user Event
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

const mock = jest.fn().mockImplementation((e) => e.preventDefault());

function renderComponent() {
	let formRefs = {
		email: "",
		password: "",
	};
	const handleLogin = mock;

	render(
		<MemoryRouter>
			<LoginForm formRefs={formRefs} handleLogin={handleLogin} />
		</MemoryRouter>
	);

	return { formRefs, handleLogin };
}

describe("LoginForm", () => {
	it("should render", () => {
		renderComponent();
		// screen.debug();
		const form = screen.getByTestId("login-form");

		expect(form).toBeInTheDocument();
	});

	it("should render the email and password input", () => {
		const { formRefs, handleLogin } = renderComponent();

		const emailInput = screen.getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput = screen.getByText(/password/i);

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(emailInput).toHaveValue("");
	});

	it("should render the submit button", () => {
		renderComponent();

		const submitButton = screen.getByRole("button", { name: /submit/i });

		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});

	it("should enable the submit button when the form fields are entered", () => {
		const { formRefs, handleLogin } = renderComponent();

		const emailInput = screen.getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput = screen.getByText(/password/i);

		userEvent.type(emailInput, "test@test.com");
		userEvent.type(passwordInput, "123456");

		const submitButton = screen.getByRole("button", { name: /submit/i });
		expect(submitButton).toBeEnabled();
	});

	it("should call the handleLogin function when the submit button is clicked", () => {
		renderComponent(mock);

		const emailInput = screen.getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput = screen.getByPlaceholderText(/password/i);

		userEvent.type(emailInput, "test@test.com");
		userEvent.type(passwordInput, "123456");

		expect(emailInput).toHaveValue("test@test.com");
		expect(passwordInput).toHaveValue("123456");

		const submitButton = screen.getByRole("button", { name: /submit/i });

		fireEvent.submit(submitButton);

		// when clicked, handleLogin should be called
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledTimes(1);
	});
});
