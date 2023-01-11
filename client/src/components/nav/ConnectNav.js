import React from "react";

import { useSelector } from "react-redux";

import { Card, Avatar } from "antd";
const { Meta } = Card;

//moment
//import moment from "moment";

const ConnectNav = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { user } = auth;

	console.log({ user });

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
					<Card>
						<div>Pending balance</div>
					</Card>
					<Card>
						<div>Payout Settings</div>
					</Card>
				</>
			)}
		</section>
	);
};

export default ConnectNav;
