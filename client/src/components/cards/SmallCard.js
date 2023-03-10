import React from "react";

//moment
import moment from "moment";

// Link
import { Link } from "react-router-dom";

// ant icons
import { EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const SmallCard = ({
	title,
	description,
	link,
	image,
	subDescription,
	id,
	admin = false,
	showViewMore = true,
	enabled = true,
	handleEnabled = (f) => f,
	loading = false,
}) => {
	return (
		<div className="card mb-3" data-testid="small-card">
			<div className="row g-0">
				<div className="col-md-4">
					{/* Check if image is available else add placeholder image */}
					{image?.contentType ? (
						<img
							src={`${process.env.REACT_APP_API}/venue/image/${id}`}
							className="img-fluid rounded-start"
							alt={title}
							style={{ maxHeight: "200px" }}
						/>
					) : (
						<img
							src="https://via.placeholder.com/900x500"
							className="img-fluid rounded-start"
							alt={title}
						/>
					)}
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p
							className="card-text"
							data-testid="venue-description">{`${description?.substring(
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

						<div className="d-flex justify-content-between align-items-center">
							{showViewMore && (
								<Link
									to={`/venue/${link}`}
									className="btn btn-primary btn-sml">
									View
								</Link>
							)}

							{admin && (
								<div className="h5">
									<Link to={`/dashboard/venue/edit/${id}`}>
										<EditOutlined title="Edit" />
									</Link>
									<a
										href="#!"
										onClick={() => handleEnabled(id)}
										className="mx-2 pe-auto">
										<EyeInvisibleOutlined
											title={`${
												enabled
													? "Hide from public"
													: "Make public"
											}`}
											className={`${
												enabled ? "" : "text-danger"
											}`}
										/>
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SmallCard;
