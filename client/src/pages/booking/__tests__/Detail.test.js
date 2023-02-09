import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import configureStore from "redux-mock-store";

// // msw
import { setupServer } from "msw/node";
import { rest } from "msw";

import { MemoryRouter } from "react-router-dom";

//providers
import { Provider } from "react-redux";

import Detail from "../Detail";

const route = "http://localhost:8000";
const slug = "test";

let isBooked = false;

const handlers = [
	rest.get(`${route}/api/venue/:slug`, (req, res, ctx) => {
		return res(
			ctx.json({
				image: { contentType: "image/jpeg" },
				_id: "63c177f8fc35251b3217ae96",
				title: "title-test",
				content: "ttttww",
				postedBy: {
					_id: "63b6e9b81b6195281d897e32",
					firstName: "Steven",
					lastName: "Parker",
				},
				price: 5342,
				from: "2023-01-19T00:00:00.000Z",
				to: "2023-02-28T00:00:00.000Z",
				people: 2,
				slug: slug,
				createdAt: "2023-01-13T15:25:44.120Z",
				updatedAt: "2023-01-24T19:12:23.043Z",
				__v: 0,
				enabled: true,
			})
		);
	}),
	rest.get(`${route}/api/is-booked/:id`, (req, res, ctx) => {
		if (isBooked) {
			return res(ctx.json(true));
		} else {
			return res(ctx.json(false));
		}
	}),
];

const server = setupServer(...handlers);

const mockStore = configureStore([]);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderComponent = (store) => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Detail />
			</MemoryRouter>
		</Provider>
	);
};

describe("Detail", () => {
	it("should render the detail page", async () => {
		const store = mockStore({
			auth: {
				user: {
					_id: "123",
					firstName: "Steven",
					lastName: "Parker",
					email: "test@test.com",
					role: "user",
				},
			},
		});

		renderComponent(store);

		const container = await screen.findByTestId("detail-container");

		expect(container).toBeInTheDocument();
	});

	it("should render the detail page with data", async () => {
		const store = mockStore({
			auth: {
				user: {
					_id: "123",
					firstName: "Steven",
					lastName: "Parker",
					email: "test@test.com",
					role: "user",
				},
			},
		});

		renderComponent(store);

		const title = await screen.findByText("title-test");
		const content = await screen.findByText("ttttww");
		const people = await screen.findByText("2 people");
		const price = await screen.findByText("£5342 per night");

		expect(title).toBeInTheDocument();
		expect(content).toBeInTheDocument();
		expect(people).toBeInTheDocument();
		expect(price).toBeInTheDocument();
	});

	it("should render book now button if logged in and not already booked", async () => {
		const store = mockStore({
			auth: {
				user: {
					_id: "123",
					firstName: "Steven",
					lastName: "Parker",
					email: "test@test.com",
					role: "user",
				},
				token: "123",
			},
		});
		renderComponent(store);

		const buttons = await screen.findAllByRole("button", {
			name: /book now/i,
		});

		expect(buttons).toHaveLength(2);
	});

	it("should render book now button if not logged in and not already booked", async () => {
		const store = mockStore({
			auth: {
				user: {
					_id: "123",
					firstName: "Steven",
					lastName: "Parker",
					email: "test@test.com",
					role: "user",
				},
			},
		});
		renderComponent(store);

		const buttons = await screen.findAllByRole("button", {
			name: /login to book/i,
		});

		expect(buttons).toHaveLength(2);
	});

	it("should render Already Booked button if already booked", async () => {
		const store = mockStore({
			auth: {
				user: {
					_id: "123",
					firstName: "Steven",
					lastName: "Parker",
					email: "test@test.com",
					role: "user",
				},
				token: "123",
			},
		});
		renderComponent(store);

		const bookButtons = await screen.findAllByRole("button", {
			name: /book now/i,
		});

		expect(bookButtons).toHaveLength(2);

		isBooked = true;

		const alreadyButtons = await screen.findAllByRole("button", {
			name: /already booked/i,
		});

		expect(alreadyButtons).toHaveLength(2);
	});

	it("should render image with the correct path", async () => {
		const store = mockStore({
			auth: {
				user: {
					_id: "123",
					firstName: "Steven",
					lastName: "Parker",
					email: "test@test.com",
					role: "user",
				},
			},
		});

		renderComponent(store);

		const image = await screen.findByRole("img", {
			name: /title-test/i,
		});

		// get image path id from the image src
		const imageId = image.src.split("/").pop();

		expect(image).toBeInTheDocument();
		expect(imageId).toBe("63c177f8fc35251b3217ae96");
	});
});
