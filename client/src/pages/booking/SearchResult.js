import React, { useState, useEffect } from "react";

// Link
import { Link } from "react-router-dom";

// query string
import queryString from "query-string";

import SmallCard from "../../components/cards/SmallCard";
import Search from "../../components/forms/Search";

//moment
import moment from "moment";

// action
import { venuesSearch } from "../../actions/venue";

// get query strings with react router dom
import { useLocation } from "react-router-dom";

const SearchResult = () => {
	// state
	const [searchDate, setSearchDate] = useState([
		moment().format("YYYY-DD-MM"),
		moment().format("YYYY-DD-MM"),
	]);
	const [searchPeople, setSearchPeople] = useState("1");
	const [searchPrice, setSearchPrice] = useState([0, 0]);

	const [searchResults, setSearchResults] = useState([]);

	// get query strings
	const location = useLocation();

	// set state with query strings
	useEffect(() => {
		const { date, people, price } = queryString.parse(location.search);

		if (date !== undefined) {
			setSearchDate(date.split(","));
		}
		setSearchPeople(people);
		if (price !== undefined) {
			setSearchPrice(price.split(","));
		}
	}, [location]);

	// get Search results
	useEffect(() => {
		getSearchResults();
	}, [searchDate, searchPeople, searchPrice]); // eslint-disable-line react-hooks/exhaustive-deps

	const getSearchResults = async () => {
		const queries = {
			dates: searchDate,
			people: searchPeople,
			price: searchPrice,
		};
		try {
			const res = await venuesSearch(queries);
			setSearchResults(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(searchDate, searchPeople, searchPrice);

	return (
		<div className="container" data-testid="search-results">
			<Search />
			<h1 className="text-center">
				{searchResults.length > 0
					? `${searchResults.length} Venue${
							searchResults.length === 1 ? "" : "s"
					  } Found`
					: "0 Venues Found"}
			</h1>
			{searchResults.map((venue) => (
				<SmallCard
					key={venue._id}
					id={venue._id}
					title={venue.title}
					description={venue.content}
					subDescription={venue.createdAt}
					link={venue.slug}
					image={venue.image}
					enabled={venue.enabled}
				/>
			))}
		</div>
	);
};

export default SearchResult;
