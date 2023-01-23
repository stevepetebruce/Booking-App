import React from "react";

// Modal
import { Modal } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
	return (
		<Modal
			open={showModal}
			onCancel={() => {
				setShowModal(!showModal);
			}}
			footer={null}>
			<div className="container">
				<div className="row">
					<div className="col">
						<h4>Order Summary</h4>
						<hr />
						<p>Payment Status: {session.payment_status}</p>
						<p>
							Customer:{" "}
							{orderedBy?.firstName ? orderedBy.firstName : ""}{" "}
							{orderedBy?.lastName ? orderedBy.lastName : ""}
						</p>
						<p>
							Customer Email:{" "}
							{session.customer_details?.email
								? session.customer_details.email
								: "No email supplied"}
							<br />
							Contact Number:{" "}
							{session.customer_details?.phone
								? session.customer_details.phone
								: "No phone number supplied"}
							<br />
							Address:{" "}
							{session.customer_details?.address
								? `${
										session.customer_details.address
											.line1 || ""
								  }, ${
										session.customer_details.address.city ||
										""
								  }, ${
										session.customer_details.address
											.postal_code || ""
								  }`
								: "No address supplied"}
							<br />
							Country:{" "}
							{session.customer_details?.address
								? session.customer_details.address.country
								: "No country supplied"}
						</p>

						<hr />
						<p>
							Total:{" "}
							<b>{(session.amount_total / 100).toFixed(2)}</b>
						</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default OrderModal;
