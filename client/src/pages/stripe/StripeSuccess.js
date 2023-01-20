import React, { useEffect, useState } from "react";
// router dom params
import { useParams, useNavigate } from "react-router-dom";

// action
import { stripeSuccessRequest } from "../../actions/stripe";

// redux
import { useSelector } from "react-redux";

const StripeSuccess = () => {
	// redux
	const { auth } = useSelector((state) => ({ ...state }));
	const { token } = auth;

	// get param (Venue Id)
	const { id } = useParams();

	// navigate
	const navigate = useNavigate();

	const [success, setSuccess] = useState({});

	useEffect(() => {
		// send request to backend to create order
		createOrder();
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	// create order
	const createOrder = async () => {
		try {
			const res = await stripeSuccessRequest(token, id);
			console.log(res);
			setSuccess(res.data);

			// redirect to dashboard if success is true (order created) else redirect to stripe failed page
			if (res.data.success) {
				navigate("/dashboard");
			} else {
				navigate("/stripe/cancel");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			StripeSuccess
			<p>{token}</p>
			<p>{id}</p>
		</div>
	);
};

export default StripeSuccess;
