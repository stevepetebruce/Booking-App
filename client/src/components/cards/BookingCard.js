import React, { useState } from "react";

// modal
import OrderModal from "../modals/OrderModal";

const BookingCard = ({ venue, session, orderedBy }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="card px-0 mb-3" data-testid="booking-card">
			<div className="row g-0">
				<div className="col-md-4">
					{/* Check if image is available else add placeholder image */}
					{venue.image?.contentType ? (
						<img
							src={`${process.env.REACT_APP_API}/venue/image/${venue._id}`}
							className="img-fluid rounded-start"
							alt={venue.title}
							style={{ maxHeight: "200px" }}
						/>
					) : (
						<img
							src="https://via.placeholder.com/900x500"
							className="img-fluid rounded-start"
							alt={venue.title}
						/>
					)}
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{venue.title}</h5>
						<p className="card-text">{`${venue.content?.substring(
							1,
							200
						)}...`}</p>
						{venue.createdAt && (
							<p className="card-text">
								{/* Check if its a date */}
								<small className="text-muted">
									Price: £{venue.price}
								</small>
							</p>
						)}

						<OrderModal
							session={session}
							orderedBy={orderedBy}
							showModal={showModal}
							setShowModal={setShowModal}
						/>

						<div className="d-flex justify-content-between align-items-center">
							<button
								onClick={() => setShowModal(!showModal)}
								className="btn btn-primary btn-sml">
								View Payment Info.
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
