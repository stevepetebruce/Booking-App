import React from "react";

//moment
import moment from "moment";

// Link
import { Link } from "react-router-dom";

const SmallCard = ({ title, description, link, image, subDescription }) => {
	return (
		<div className="card mb-3">
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src={image}
						className="img-fluid rounded-start"
						alt={title}
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{`${description.substring(
							1,
							200
						)}...`}</p>
						{subDescription && (
							<p className="card-text">
								{/* Check if its a date */}
								<small className="text-muted">
									{moment(
										subDescription,
										moment.ISO_8601,
										true
									).isValid()
										? `Added: ${moment(
												subDescription
										  ).format("DD/MM/YYYY")}`
										: subDescription}
								</small>
							</p>
						)}

						<Link
							to={`/venue/${link}`}
							className="btn btn-primary btn-sml">
							View
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SmallCard;
