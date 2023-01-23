import React, { useEffect, useState } from "react";

// params
import { useParams, Link } from "react-router-dom";

import { adminVenue } from "../../actions/venue";

const StripeCancel = () => {
	// params
	const { id } = useParams();

	const [venue, setVenue] = useState({});

	// get venue using id
	useEffect(() => {
		getVenue(id);
	}, [id]);

	const getVenue = async (id) => {
		try {
			const res = await adminVenue(id);
			console.log("VENUE IN STRIPE CANCEL", res.data);
			setVenue(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h4>Your purchase has been cancelled</h4>
					<p>Return to the venue and try again. </p>
					<Link to={`/venue/${venue.slug}`}>
						<button className="btn btn-primary btn-raised">
							Return to venue
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default StripeCancel;
