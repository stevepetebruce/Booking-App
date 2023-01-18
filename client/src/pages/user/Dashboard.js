import { Link } from "react-router-dom";

import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";

import React from "react";

const Dashboard = () => {
	return (
		<div className="container">
			<ConnectNav />
			<DashboardNav />
			<div className="py-5">
				<div className="row">
					<div className="col-md-10">Your Bookings</div>
					<div className="col-md-2">
						<Link to="/" className="btn btn-primary">
							Browse Venues
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
