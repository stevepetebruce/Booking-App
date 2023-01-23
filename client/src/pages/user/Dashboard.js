import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import DashboardNav from "../../components/nav/DashboardNav";
import ConnectNav from "../../components/nav/ConnectNav";

import { userBookings } from "../../actions/venue";

import { useSelector } from "react-redux";

// components
import BookingCard from "../../components/cards/BookingCard";

const Dashboard = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const token = auth.token;

	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		getBookings(token);
	}, [token]);

	const getBookings = async (token) => {
		const res = await userBookings(token);
		setBookings(res.data);
	};

	console.log("bookings", bookings);

	return (
		<div className="container">
			<ConnectNav />
			<DashboardNav />
			<div className="py-5">
				<div className="row">
					<div className="col-md-10">
						<h2>Your Bookings</h2>
					</div>
					<div className="col-md-2">
						<Link to="/" className="btn btn-primary">
							Browse Venues
						</Link>
					</div>
				</div>
				<div className="row">
					{bookings.length > 0 ? (
						bookings.map((booking) => {
							return (
								<BookingCard
									key={booking._id}
									venue={booking.venue}
									session={booking.session}
									orderedBy={booking.orderedBy}
								/>
							);
						})
					) : (
						<div className="alert alert-secondary">
							No bookings yet
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
