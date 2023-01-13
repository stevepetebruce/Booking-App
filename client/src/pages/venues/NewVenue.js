import React, { useState, useRef } from "react";

import { createVenue } from "../../actions/venue";

// redux
import { useSelector } from "react-redux";

// toast
import { toast } from "react-toastify";

//moment
import moment from "moment";

//algolia
// import AlgoliaPlaces from "algolia-places-react";

// datepicker
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;

// const config = {
// 	appId: process.env.REACT_APP_ALGOLIA_APP_ID,
// 	apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
// 	language: "en",
// 	//countries: ["us"],
// };

const NewVenue = () => {
	// redux
	const { auth } = useSelector((state) => ({ ...state }));
	const { token } = auth;

	// form refs
	const titleRef = useRef("null");
	const contentRef = useRef("null");
	const priceRef = useRef("0");

	const [values, setValues] = useState({
		people: "1",
		image: {},
		from: "",
		to: "",
	});

	const onDateChange = (date, dateString) => {
		console.log(date, dateString);
		setValues({ ...values, from: dateString[0], to: dateString[1] });
	};

	const [preview, setPreview] = useState(
		"https://via.placeholder.com/100x100.png?text=PREVIEW"
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			// form Data
			const formData = new FormData();
			formData.append("title", titleRef.current.value);
			formData.append("content", contentRef.current.value);
			formData.append("price", priceRef.current.value);
			formData.append("image", values.image ? values.image : "");
			formData.append("from", values.from);
			formData.append("to", values.to);
			formData.append("people", values.people);

			createVenue(formData, token).then((res) => {
				console.log("VENUE CREATE RES", res);
				toast.success(`"${res.data.title}" is created`);

				// clear form
				titleRef.current.value = "";
				contentRef.current.value = "";
				priceRef.current.value = "";
				setPreview(
					"https://via.placeholder.com/100x100.png?text=PREVIEW"
				);
				setValues({
					...values,
					image: {},
					from: "",
					to: "",
					people: "1",
				});
			});
		} catch (err) {
			console.log(err);
			toast.error(err.response.data);
		}
	};

	return (
		<div className="container">
			<h2>New Venue</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input
						type="text"
						className="form-control"
						ref={titleRef}
					/>
				</div>
				<div className="form-group">
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
				<div className="form-group">
					<label className="text-muted">Price</label>
					<input
						type="number"
						className="form-control"
						ref={priceRef}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">People</label>
				</div>
				<Select
					defaultValue="1"
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
				<div className="form-group">
					<label className="text-muted">Image</label>
					<input
						type="file"
						accept="image/*"
						className="form-control"
						onChange={(e) => {
							console.log("e.target.files[0]", e.target.files[0]);
							setPreview(URL.createObjectURL(e.target.files[0]));
							setValues({ ...values, image: e.target.files[0] });
						}}
					/>
					{preview && (
						<img
							src={preview}
							alt="preview"
							className="img img-fluid mt-2"
						/>
					)}
				</div>
				<div className="form-group">
					<label className="text-muted">Date</label>
				</div>
				<RangePicker
					size="large"
					onChange={onDateChange}
					disabledDate={(current) =>
						current &&
						current.valueOf() < moment().subtract(1, "days")
					}
					style={{ width: "100%" }}
				/>

				<div className="mt-4">
					<button className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
	);
};

export default NewVenue;
