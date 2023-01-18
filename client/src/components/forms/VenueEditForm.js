import React from "react";

//moment
import moment from "moment";

// dayjs
import dayjs from "dayjs";

//algolia
// import AlgoliaPlaces from "algolia-places-react";

// datepicker
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;

// const config = {
// 	appId: process.env.REACT_APP_ALGOLIA_APP_ID,
// 	apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
// 	language: "en",
// 	//countries: ["us"],
// };

const VenueEditForm = ({
	handleSubmit,
	values,
	setValues,
	preview,
	setPreview,
	onDateChange,
	titleRef,
	contentRef,
	priceRef,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-8">
					<div className="form-group mb-3">
						<label className="text-muted">Title</label>
						<input
							type="text"
							className="form-control"
							ref={titleRef}
						/>
					</div>
					<div className="form-group mb-3">
						<label className="text-muted">Content</label>
						<textarea className="form-control" ref={contentRef} />
					</div>
					{/* <div className="form-group">
                        <label className="text-muted">Location</label>
                        <AlgoliaPlaces
                            placeholder="Write your address here"
                            className="form-control"
                            options={config}
                            onChange={({
                                query,
                                rawAnswer,
                                suggestion,
                                suggestionIndex,
                            }) => setValues({ ...values, location: suggestion.value })}
                            onClear={() => setValues({ ...values, location: "" })}
                            onError={({ message }) => toast.error(message)}
                        />
                    </div> */}
					<div className="form-group mb-3">
						<label className="text-muted">Price</label>
						<div className="input-group">
							<span
								className="input-group-text"
								id="basic-addon1">
								£
							</span>
							<input
								type="number"
								className="form-control"
								ref={priceRef}
								step=".01"
							/>
						</div>
					</div>
					<div className="form-group mb-3">
						<label className="text-muted">People</label>
					</div>
					<Select
						value={values.people}
						className="mb-3"
						size="large"
						style={{ width: "100%" }}
						onChange={(value) =>
							setValues({ ...values, people: value })
						}
						options={[
							{
								value: "1",
								label: "1",
							},
							{
								value: "2",
								label: "2",
							},
							{
								value: "3",
								label: "3",
							},
							{
								value: "4",
								label: "4",
							},
						]}></Select>
					<div className="form-group mb-3">
						<label className="text-muted">Image</label>
						<input
							type="file"
							accept="image/*"
							className="form-control"
							// value={image}
							onChange={(e) => {
								console.log(
									"e.target.files[0]",
									e.target.files[0]
								);
								setPreview(
									URL.createObjectURL(e.target.files[0])
								);
								setValues({
									...values,
									image: e.target.files[0],
								});
							}}
						/>
					</div>
					<div className="form-group">
						<label className="text-muted">Date</label>
					</div>

					{values.from && values.to && (
						<RangePicker
							size="large"
							// Render with dayjs instead of moment to avoid warning
							defaultValue={[
								dayjs(values.from, "YYYY-MM-DD"),
								dayjs(values.to, "YYYY-MM-DD"),
							]}
							onChange={onDateChange}
							disabledDate={(current) =>
								current &&
								current.valueOf() < moment().subtract(1, "days")
							}
							style={{ width: "100%" }}
						/>
					)}

					<div className="mt-4">
						<button className="btn btn-primary">Update</button>
					</div>
				</div>
				<div className="col-md-4">
					{preview && (
						<img
							src={preview}
							alt="preview"
							className="img img-fluid mt-2"
						/>
					)}
				</div>
			</div>
		</form>
	);
};

export default VenueEditForm;
