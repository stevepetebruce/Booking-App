import React, { useState, useEffect } from "react";

import { venue } from "../../actions/venue";

// redux
import { useSelector } from "react-redux";

// moment
import moment from "moment";

// params
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
	const navigate = useNavigate();

	// redux
	const { auth } = useSelector((state) => ({ ...state }));

	// params
	const { slug } = useParams();
	const [data, setData] = useState({});
	const [image, setImage] = useState({});

	useEffect(() => {
		getVenue();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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

	const handleClick = (e) => {
		e.preventDefault();
		// check if user is logged in
		if (!auth.token) {
			console.log("Please login to book");
			navigate("/login");
			return;
		}
		if (auth?.token) {
			// send request to backend
			console.log({ auth });
		}
	};

	return (
		<div className="container">
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

					<button
						onClick={handleClick}
						className="btn btn-primary btn-block mt-5">
						{auth?.token ? "Book Now" : "Login to Book"}
					</button>
				</div>
				<div className="col-md-8">
					<p>{data.content}</p>
					<p>
						<button
							onClick={handleClick}
							className="btn btn-primary btn-block mt-3">
							{auth?.token ? "Book Now" : "Login to Book"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Detail;
