import React from "react";

import { Link } from "react-router-dom";

const DashboardNav = () => {
	// active tab depending on route
	const activeTab = (path) => {
		if (window.location.pathname === path) {
			return "nav-link active";
		} else {
			return "nav-link";
		}
	};

	return (
		<ul className="nav nav-pills">
			<li className="nav-item">
				<Link
					className={activeTab("/dashboard")}
					aria-current="page"
					to="/dashboard">
					Your Bookings
				</Link>
			</li>
			<li className="nav-item">
				<Link
					className={activeTab("/dashboard/seller")}
					to="/dashboard/seller">
					Your Venues
				</Link>
			</li>
		</ul>
	);
};

export default DashboardNav;
