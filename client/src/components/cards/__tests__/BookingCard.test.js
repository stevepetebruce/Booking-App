import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// user Event
import userEvent from "@testing-library/user-event";

import BookingCard from "../BookingCard";

import { MemoryRouter } from "react-router-dom";

function renderComponent() {
	const venue = {
		_id: "63c177f8fc35251b3217ae96",
		title: "ttttww3",
		content: "ttttww",
		postedBy: {
			id: "63b6e9b81b6195281d897e32",
		},
		price: 5342,
		image: {
			contentType: "image/jpeg",
		},
		from: "1674086400000",
		to: "1677542400000",
		people: 2,
		slug: "ttttww3",
	};
	const session = {};
	const orderedBy = {};
	render(
		<MemoryRouter>
			<BookingCard
				venue={venue}
				session={session}
				orderedBy={orderedBy}
			/>
		</MemoryRouter>
	);
	return { venue };
}

describe("BookingCard", () => {
	it("should render", () => {
		renderComponent();
		// screen.debug();
		const card = screen.getByTestId("booking-card");

		expect(card).toBeInTheDocument();
	});

	it("should render the venue title and content", () => {
		const { venue } = renderComponent();

		const title = screen.getByRole("heading", { name: /ttttww3/i });
		const content = screen.getByRole("heading", { name: /ttttww/i });

		expect(title).toHaveTextContent(venue.title);
		expect(content).toHaveTextContent(venue.content);
	});

	it("should render the image", async () => {
		const { venue } = renderComponent();
		const path = `http://localhost:8000/api/venue/image/${venue._id}`;
		const image = await screen.findByRole("img", { name: /ttttww3/i });
		expect(image).toHaveAttribute("src", path);
	});

	it("should set modal to true when button is clicked", async () => {
		renderComponent();

		let modal;

		modal = screen.queryByRole("dialog");
		expect(modal).not.toBeInTheDocument();

		const button = screen.getByRole("button", {
			name: /View Payment Info/i,
		});
		expect(button).toBeInTheDocument();
		userEvent.click(button);

		modal = await screen.findByRole("dialog");
		expect(modal).toBeInTheDocument();
	});
});
