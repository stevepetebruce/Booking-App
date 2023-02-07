import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SmallCard from "../SmallCard";

// user Event
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

function renderComponent(isAdmin = true, mock = () => {}) {
	const id = "63c177f8fc35251b3217ae96";
	const title = "Test Title";
	const description = "ttttww fgdg fdgdfg d";
	const link = "test-venue";
	const image = {
		contentType: "image/jpeg",
	};
	const subDescription = "ttttww fg";
	const admin = isAdmin;
	const showViewMore = true;
	let enabled = true;
	const loading = false;

	render(
		<MemoryRouter>
			<SmallCard
				title={title}
				description={description}
				link={link}
				image={image}
				subDescription={subDescription}
				id={id}
				admin={admin}
				showViewMore={showViewMore}
				enabled={enabled}
				handleEnabled={mock}
				loading={loading}
			/>
		</MemoryRouter>
	);

	return { id, title, description, link };
}

afterEach(() => {
	jest.clearAllMocks();
});

describe("SmallCard", () => {
	it("should render", () => {
		renderComponent();
		// screen.debug();
		const card = screen.getByTestId("small-card");

		expect(card).toBeInTheDocument();
	});

	it("should render the venue title and description", () => {
		const { title, description } = renderComponent();

		const titleRendered = screen.getByRole("heading", {
			name: /test title/i,
		});
		const content = screen.getAllByTestId("venue-description")[0];

		expect(titleRendered).toHaveTextContent(title);
		expect(content).toHaveTextContent(
			`${description.substring(1, 200)}...`
		);
	});

	it("should render the image", async () => {
		const { id, title } = renderComponent();
		const path = `http://localhost:8000/api/venue/image/${id}`;
		const image = await screen.findByRole("img", { name: title });
		expect(image).toHaveAttribute("src", path);
	});

	it("should render the view more button and go to correct link", () => {
		const { link } = renderComponent();
		const button = screen.getByRole("link", { name: /view/i });

		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("href", `/venue/${link}`);
	});

	it("should render the Public and edit buttons and call handleEnabled (Public) when clicked (Admin === true)", () => {
		const mock = jest.fn();
		let { id } = renderComponent(true, mock);
		const publicButtonLink = screen.getByRole("link", {
			name: /eye-invisible/i,
		});
		const editButtonLink = screen.getByRole("link", {
			name: /edit/i,
		});

		expect(publicButtonLink).toBeInTheDocument();
		expect(editButtonLink).toBeInTheDocument();
		expect(publicButtonLink).toHaveAttribute("href", `#!`);
		expect(editButtonLink).toHaveAttribute(
			"href",
			`/dashboard/venue/edit/${id}`
		);

		// when clicked, handleEnabled should be called
		userEvent.click(publicButtonLink);
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledWith(id);
	});

	it("should render only 'show more' button when admin is false", () => {
		renderComponent(false);
		const publicButtonLink = screen.queryByRole("link", {
			name: /eye-invisible/i,
		});
		const editButtonLink = screen.queryByRole("link", {
			name: /edit/i,
		});
		const viewMoreButton = screen.getByRole("link", {
			name: /view/i,
		});

		expect(publicButtonLink).not.toBeInTheDocument();
		expect(editButtonLink).not.toBeInTheDocument();
		expect(viewMoreButton).toBeInTheDocument();
	});
});
