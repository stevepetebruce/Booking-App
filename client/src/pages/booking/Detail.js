import React, { useState, useEffect } from "react";

import { venue } from "../../actions/venue";

// params
import { useParams } from "react-router-dom";

function Detail() {
	// params
	const { slug } = useParams();
	const [currentVenue, setCurrentVenue] = useState({});

	useEffect(() => {
		getVenue();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getVenue = async () => {
		try {
			// get venue from backend
			const res = await venue(slug);
			setCurrentVenue(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			VenueDetail
			{currentVenue && JSON.stringify(currentVenue)}
		</div>
	);
}

export default Detail;
