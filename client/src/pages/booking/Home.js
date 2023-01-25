import React, { useEffect, useState } from "react";

import { venues as allVenues } from "../../actions/venue";
import Search from "../../components/forms/Search";
import SmallCard from "../../components/cards/SmallCard";

// Redux - useSelector
import { useSelector } from "react-redux";

function Home() {
	// Redux - useSelector
	const state = useSelector((state) => state);
	console.log({ state });

	const [venues, setVenues] = useState([]);

	useEffect(() => {
		getVenues();
	}, []);

	const getVenues = async () => {
		try {
			const res = await allVenues();
			setVenues(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			<Search />

			<h1 className="text-center">Venues</h1>
			{venues &&
				venues.map((venue) => (
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
}

export default Home;
