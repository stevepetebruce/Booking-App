import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import configureStore from "redux-mock-store";

// // msw
import { setupServer } from "msw/node";
import { rest } from "msw";

import { MemoryRouter } from "react-router-dom";

//providers
import { Provider } from "react-redux";

import Home from "../Home";

const route = "http://localhost:8000";

const handlers = [
	rest.get(`${route}/api/venues`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					image: { contentType: "image/jpeg" },
					_id: "1234",
					title: "ttttww3",
					content: "ttttww",
					postedBy: {
						_id: "111",
						firstName: "Steven",
						lastName: "Parker",
					},
					price: 5342,
					from: "2023-01-19T00:00:00.000Z",
					to: "2023-02-28T00:00:00.000Z",
					people: 2,
					slug: "ttttww3",
					createdAt: "2023-01-13T15:25:44.120Z",
					updatedAt: "2023-01-24T19:12:23.043Z",
					__v: 0,
					enabled: true,
				},
				{
					image: { contentType: "image/jpeg" },
					_id: "423",
					title: "Alpujarra",
					content: "bvcbvc",
					postedBy: {
						_id: "111",
						firstName: "Steven",
						lastName: "Parker",
					},
					price: 120.99,
					from: "2023-01-17T00:00:00.000Z",
					to: "2023-02-28T00:00:00.000Z",
					people: 2,
					slug: "Alpujarra",
					createdAt: "2023-01-16T15:04:10.595Z",
					updatedAt: "2023-01-18T13:29:13.021Z",
					__v: 0,
					enabled: true,
				},
			])
		);
	}),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Ignore Search component
jest.mock("../../../components/forms/Search", () => () => <div />);

describe("Home", () => {
	it("should render", () => {
		const initialState = { id: 1 };
		const mockStore = configureStore();

		render(
			<Provider store={mockStore(initialState)}>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</Provider>
		);

		const home = screen.getByTestId("home");
		expect(home).toBeInTheDocument();
	});

	it("should render the venues", async () => {
		const initialState = { id: 1 };
		const mockStore = configureStore();

		render(
			<Provider store={mockStore(initialState)}>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</Provider>
		);

		const venue1 = await screen.findByText(/ttttww3/i);
		const venue2 = await screen.findByText(/Alpujarra/i);

		expect(venue1).toBeInTheDocument();
		expect(venue2).toBeInTheDocument();

		const allVenues = await screen.findAllByTestId("small-card");
		expect(allVenues.length).toBe(2);
	});
});
