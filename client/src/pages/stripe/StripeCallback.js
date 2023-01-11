import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAccountStatus } from "../../actions/stripe";
import { updateUserInLocalStorage } from "../../actions/auth";

// spinner
import { Space, Spin } from "antd";

const StripeCallback = ({ history }) => {
	const { auth } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	// get the account status
	useEffect(() => {
		if (auth && auth.token) accountStatus();
	}, [auth]); // eslint-disable-line react-hooks/exhaustive-deps

	const accountStatus = async () => {
		try {
			const res = await getAccountStatus(auth.token);
			console.log("ACCOUNT STATUS", res);

			if (res.data.stripe_seller?.charges_enabled) {
				// update user in local storage
				updateUserInLocalStorage(res.data, () => {
					// update user in redux store too (next) - this is a callback function
					dispatch({
						type: "LOGGED_IN_USER",
						payload: res.data,
					});

					// redirect to dashboard
					window.location.href = "/dashboard/seller";
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="d-flex justify-content-center p-5">
			<Space size="middle">
				<Spin size="large" />
			</Space>
		</div>
	);
};

export default StripeCallback;
