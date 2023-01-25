import React, { useState, useEffect } from "react";

// Link
import { Link } from "react-router-dom";

// query string
import queryString from "query-string";

// Search Form
import Search from "../../components/forms/Search";

// action
import { venuesSearch } from "../../actions/venue";

// get query strings with react router dom
import { useLocation } from "react-router-dom";

const SearchResult = () => {
	// state
	const [searchDate, setSearchDate] = useState("");
	const [searchPeople, setSearchPeople] = useState([]);
	const [searchPrice, setSearchPrice] = useState([]);

	const [searchResults, setSearchResults] = useState([]);

	// get query strings
	const location = useLocation();

	// set state with query strings
	useEffect(() => {
		const { date, people, price } = queryString.parse(location.search);

		setSearchDate(date.split(","));
		setSearchPeople(people);
		setSearchPrice(price.split(","));
	}, [location]);

	// get Search results
	useEffect(() => {
		getSearchResults();
	}, [searchDate, searchPeople, searchPrice]); // eslint-disable-line react-hooks/exhaustive-deps

	const getSearchResults = async () => {
		try {
			const res = await venuesSearch({
				dates: searchDate,
				people: searchPeople,
				price: searchPrice,
			});
			setSearchResults(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(searchDate, searchPeople, searchPrice);

	return (
		<div className="container">
			SearchResult
			<br></br>
			{JSON.stringify(searchResults, null, 4)}
		</div>
	);
};

export default SearchResult;
