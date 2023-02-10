import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import configureStore from "redux-mock-store";

// // msw
import { rest } from "msw";
import { setupServer } from "msw/node";

import { MemoryRouter } from "react-router-dom";

//providers
import { Provider } from "react-redux";

import SearchResult from "../SearchResult";

const route = "http://localhost:8000";

const handlers = [
	rest.post(`${route}/api/venues/search`, (req, res, ctx) => {
		const queries = req.url.searchParams.get("queries");
		console.log("query", queries);
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
				},
			])
		);
	}),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderComponent = (store) => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<SearchResult />
			</MemoryRouter>
		</Provider>
	);
};

describe("SearchResult", () => {
	it("should render the SearchResult component", async () => {
		const mockStore = configureStore();
		const store = mockStore({
			auth: {
				token: "123",
				user: {
					_id: "111",
					firstName: "Steven",
					lastName: "Parker",
				},
			},
		});

		renderComponent(store);

		expect(screen.getByTestId("search-results")).toBeInTheDocument();
	});
	it("should display 2 search results", async () => {
		const mockStore = configureStore();
		const store = mockStore({
			auth: {
				token: "123",
				user: {
					_id: "111",
					firstName: "Steven",
					lastName: "Parker",
				},
			},
		});

		renderComponent(store);

		expect(await screen.findAllByTestId("small-card")).toHaveLength(2);
	});
});
