import React, { useState, useEffect } from "react";

import { venue, isBooked } from "../../actions/venue";

// redux
import { useSelector } from "react-redux";

// moment
import moment from "moment";

// actions
import { getSessionId } from "../../actions/stripe";

// params
import { useParams, useNavigate } from "react-router-dom";

// stripe checkout
import { loadStripe } from "@stripe/stripe-js";

function Detail() {
	const navigate = useNavigate();

	// stripe
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

	// redux
	const { auth } = useSelector((state) => ({ ...state }));

	// params
	const { slug } = useParams();
	const [data, setData] = useState({});
	const [image, setImage] = useState({});
	const [alreadyBooked, setAlreadyBooked] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getVenue();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// check if venue is booked
	useEffect(() => {
		if (auth.token && data._id) {
			isAlreadyBooked();
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	const getVenue = async () => {
		try {
			// get venue from backend
			const res = await venue(slug);
			setData(res.data);
			// set image
			setImage(
				`${process.env.REACT_APP_API}/venue/image/${res.data._id}`
			);
		} catch (error) {
			console.log(error);
		}
	};

	const isAlreadyBooked = async () => {
		try {
			const res = await isBooked(data._id, auth.token);
			console.log("BOOKED CHECK", res.data);
			setAlreadyBooked(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = async (e) => {
		e.preventDefault();

		// check if user is not logged in
		if (!auth?.token) {
			navigate("/login");
			return;
		}

		setLoading(true);
		// check if user is logged in
		if (!auth.token) {
			console.log("Please login to book");
			navigate("/login");
			return;
		}
		if (auth?.token) {
			// send request to backend
			console.log("SENDING REQUEST TO BACKEND");
			// get session id from backend and redirect to stripe checkout
			let res = await getSessionId(auth.token, data._id);
			// console.log("SESSION RESPONSE", res.data);

			// redirect to stripe checkout
			const stripe = await stripePromise;
			stripe
				.redirectToCheckout({
					sessionId: res.data.sessionId,
				})
				.then((result) => console.log(result));
		}
		setLoading(false);
	};

	return (
		<div className="container" data-testid="detail-container">
			<h1>{data.title}</h1>
			{/* two columns */}
			<div className="row">
				<div className="col-md-4">
					<img
						src={
							image ||
							"https://via.placeholder.com/200x200.png?text=PREVIEW"
						}
						alt={data.title}
						className="img img-fluid m-2"
					/>
					<p>
						{data.from && data.to
							? `From ${moment(data.from).format(
									"Do MMMM YYYY"
							  )} to ${moment(data.to).format("Do MMMM YYYY")}`
							: "Available all year round"}
					</p>

					<div className="alert alert-light" role="alert">
						{data.price
							? `£${data.price} per night`
							: "Free to stay"}
					</div>
					<h4>
						{data.people > 1 ? `${data.people} people` : "1 person"}
					</h4>

					<h5 className="mt-4">
						<span className="text-secondary">Hosted by</span> <br />
						{data.postedBy &&
							`${data.postedBy.firstName} ${data.postedBy.lastName}`}
					</h5>

					{alreadyBooked ? (
						<button
							className="btn btn-primary btn-block mt-5"
							disabled={alreadyBooked}>
							Already Booked
						</button>
					) : (
						<button
							onClick={handleClick}
							className="btn btn-primary btn-block mt-5"
							disabled={loading}>
							{loading ? (
								<div
									className="spinner-border spinner-border-sm text-light"
									role="status">
									<span className="visually-hidden">
										Loading...
									</span>
								</div>
							) : auth?.token ? (
								"Book Now"
							) : (
								"Login to Book"
							)}
						</button>
					)}
				</div>
				<div className="col-md-8">
					<p>{data.content}</p>
					<p>
						{alreadyBooked ? (
							<button
								className="btn btn-primary btn-block mt-5"
								disabled={alreadyBooked}>
								Already Booked
							</button>
						) : (
							<button
								onClick={handleClick}
								className="btn btn-primary btn-block mt-5"
								disabled={loading}>
								{loading ? (
									<div
										className="spinner-border spinner-border-sm text-light"
										role="status">
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
								) : auth?.token ? (
									"Book Now"
								) : (
									"Login to Book"
								)}
							</button>
						)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Detail;
