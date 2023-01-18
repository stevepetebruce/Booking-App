import React, { useState, useRef } from "react";

import { createVenue } from "../../actions/venue";
import VenueCreateForm from "../../components/forms/VenueCreateForm";

// redux
import { useSelector } from "react-redux";

// toast
import { toast } from "react-toastify";

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
		"https://via.placeholder.com/200x200.png?text=PREVIEW"
	);

	const handleSubmit = async (e) => {
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

			const res = await createVenue(formData, token);

			console.log("VENUE CREATE RES", res);

			// clear form
			titleRef.current.value = "";
			contentRef.current.value = "";
			priceRef.current.value = "";
			setPreview("https://via.placeholder.com/100x100.png?text=PREVIEW");

			toast.success(`"${res.data.title}" is created`);

			setValues({
				...values,
				image: {},
				from: "",
				to: "",
				people: "1",
			});
		} catch (err) {
			console.log(err.response.data);
			toast.error(err.response.data);
		}
	};

	return (
		<div className="container">
			<h2>New Venue</h2>
			<VenueCreateForm
				values={values}
				preview={preview}
				setPreview={setPreview}
				setValues={setValues}
				onDateChange={onDateChange}
				handleSubmit={handleSubmit}
				titleRef={titleRef}
				contentRef={contentRef}
				priceRef={priceRef}
			/>
		</div>
	);
};

export default NewVenue;
