import React from "react";

import { Link } from "react-router-dom";

import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";

const DashboardSeller = () => {
	return (
		<div className="container">
			<ConnectNav />
			<DashboardNav />

			<div className="album py-5">
				<div className="row">
					<div className="col-md-10">Your Venues</div>
					<div className="col-md-2">
						<Link to="/venues/new" className="btn btn-primary">
							+ Add New
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardSeller;
