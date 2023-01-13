import React, { useEffect, useState } from "react";

import { venues as allVenues } from "../../actions/venue";
import SmallCard from "../../components/cards/SmallCard";

// Redux - useSelector
import { useSelector } from "react-redux";

function Home() {
	// Redux - useSelector
	const state = useSelector((state) => state);

	const [venues, setVenues] = useState([]);
	const [venueImage, setVenueImage] = useState([]);

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
			<h1 className="text-center">Venues</h1>
			{venues &&
				venues.map((venue) => (
					<SmallCard
						key={venue._id}
						title={venue.title}
						description={venue.content}
						subDescription={venue.createdAt}
						link={venue.slug}
						image={venueImage}
					/>
				))}
		</div>
	);
}

export default Home;
