import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// post/get actions
import { getAccountBalance } from "../../actions/stripe";

// currency formatter
import { formatCurrency } from "../../utils/formatCurrency";

import { Card, Avatar, Badge } from "antd";
const { Meta } = Card;
const { Ribbon } = Badge;

//moment
//import moment from "moment";

const ConnectNav = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { user } = auth;

	// state
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

					<Card>
						<div>Payout Settings</div>
					</Card>
				</>
			)}
		</section>
	);
};

export default ConnectNav;
