import React, { useState, useEffect } from "react";

// toast
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

// post/get actions
import { getAccountBalance, payoutSetting } from "../../actions/stripe";

// currency formatter
import { formatCurrency } from "../../utils/formatCurrency";

import { SettingOutlined } from "@ant-design/icons";
import { Card, Avatar, Badge } from "antd";
const { Meta } = Card;
const { Ribbon } = Badge;

//moment
//import moment from "moment";

const ConnectNav = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { user, token } = auth;

	// state
	const [loading, setLoading] = useState(false);
	const [balance, setBalance] = useState(0);

	console.log({ user });

	// Get account balance
	useEffect(() => {
		getAccountBalance(auth.token)
			.then((res) => {
				console.log("BALANCE", res);
				setBalance(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Payout settings
	const handlePayoutSettings = async () => {
		setLoading(true);
		try {
			const res = await payoutSetting(token);
			console.log("PAYOUT SETTINGS", res);
			window.location.href = res.data.url;
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
			toast("Stripe payout settings failed. Try again.", {
				type: "error",
			});
		}
	};

	return (
		<section className="container d-flex justify-content-around py-5">
			<Card>
				<Meta
					avatar={<Avatar>{user.firstName[0]}</Avatar>}
					title={user.firstName}
					description={user.firstName}
				/>
			</Card>
			{auth.token && auth.user.stripe_seller?.charges_enabled && (
				<>
					<Ribbon text="Avaialable">
						<Card className="p-4">
							{balance.pending?.length > 0 &&
								balance.pending.map((balancePending, i) => (
									<span className="lead" key={i}>
										{formatCurrency(
											balancePending.amount,
											balancePending.currency
										)}
									</span>
								))}
						</Card>
					</Ribbon>

					<Ribbon text="Payouts">
						<Card className="p-4">
							{loading ? (
								<div
									className="spinner-border spinner-border-sm text-primary mt-3"
									role="status">
									<span className="visually-hidden">
										Loading...
									</span>
								</div>
							) : (
								<Link onClick={handlePayoutSettings}>
									<SettingOutlined className="h5 pt-2" />
								</Link>
							)}
						</Card>
					</Ribbon>
				</>
			)}
		</section>
	);
};

export default ConnectNav;
