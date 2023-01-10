import React, { useState } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";
import { registerConnectAccount } from "../../actions/stripe";

// Redux - useSelector
import { useSelector } from "react-redux";

const DashboardSeller = () => {
	// Redux - useSelector
	const { auth } = useSelector((state) => ({ ...state }));

	const [loading, setLoading] = useState(false);

	// handle stripe onboarding
	const handleOnboarding = async () => {
		console.log("handleOnboarding");
		setLoading(true);
		try {
			const res = await registerConnectAccount(auth.token);
			console.log("REGISTER CONNECT ACCOUNT RES", res);
			setLoading(false);
		} catch (err) {
			console.log("REGISTER CONNECT ACCOUNT ERR", err);
			toast.error("Stripe onboarding failed. Try again.");
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<ConnectNav />
			<DashboardNav />

			{auth?.user?.stripe_seller?.charges_enabled ? (
				<div className="album py-5">
					<div className="row">
						<div className="col-md-10">Your Venues</div>
						<div className="col-md-2">
							<Link
								disabled={loading}
								to="/venues/new"
								className="btn btn-primary ">
								{!loading ? (
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
