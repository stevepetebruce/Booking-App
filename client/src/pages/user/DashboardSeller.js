import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";
// card
import SmallCard from "../../components/cards/SmallCard";
import { registerConnectAccount } from "../../actions/stripe";
import { adminVenues, enableVenue } from "../../actions/venue";

// Redux - useSelector
import { useSelector } from "react-redux";

const DashboardSeller = () => {
	// Redux - useSelector
	const { auth } = useSelector((state) => ({ ...state }));

	const [loading, setLoading] = useState(false);
	const [venues, setVenues] = useState([]);

	// handle stripe onboarding
	const handleOnboarding = async () => {
		console.log("handleOnboarding");
		setLoading(true);
		try {
			const res = await registerConnectAccount(auth.token);
			console.log("REGISTER CONNECT ACCOUNT RES", res);
			setLoading(false);
			// redirect to stripe onboarding page when link is received from backend
			window.location.href = res.data;
		} catch (err) {
			console.log("REGISTER CONNECT ACCOUNT ERR", err);
			toast.error("Stripe onboarding failed. Try again.");
			setLoading(false);
		}
	};

	// handle venue enable status (Public or not)
	const handleEnabled = async (id) => {
		console.log("Enabled");
		try {
			const res = await enableVenue(id, auth.token);
			console.log(res);
			res.data.enabled === true
				? toast.success(
						`${res.data.title} is now visible for the public`
				  )
				: toast.success(`${res.data.title} is now disabled`);

			loadVenues();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadVenues();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const loadVenues = async () => {
		const { data } = await adminVenues(auth.token);
		console.log("VENUES", data);
		setVenues(data);
	};

	return (
		<div className="container">
			<ConnectNav />
			<DashboardNav />

			{auth?.user?.stripe_seller?.charges_enabled ? (
				<div className="container album py-5">
					<div className="row mb-4">
						<div className="col-md-10">
							<h2>Your Venues</h2>
						</div>
						<div className="col-md-2">
							<Link
								disabled={loading}
								to="/dashboard/venue/new"
								className="btn btn-primary float-end">
								{loading ? (
									<div
										className="spinner-border spinner-border-sm text-light"
										role="status">
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
								) : (
									"+ Add New"
								)}
							</Link>
						</div>
					</div>

					{venues.map((venue) => (
						<SmallCard
							key={venue._id}
							id={venue._id}
							title={venue.title}
							description={venue.content}
							subDescription={venue.createdAt}
							link={venue.slug}
							image={venue.image}
							showViewMore={false}
							admin={true}
							enabled={venue.enabled}
							handleEnabled={handleEnabled}
						/>
					))}
				</div>
			) : (
				<div className="container p-5 text-center">
					<div className="row">
						<div className="col">
							<h2>Set up payments to list your venue</h2>
							<p className="mb-4">
								We partner with Stripe totransfer earings to
								your bank account
							</p>
							<Link
								onClick={handleOnboarding}
								className="btn btn-primary">
								{loading ? (
									<div
										className="spinner-border spinner-border-sm text-light"
										role="status">
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
								) : (
									"Connect to stripe"
								)}
							</Link>
							<p className="small mt-4 text-muted">
								You will be redirected to Stripe to complete the
								onboarding process.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardSeller;
