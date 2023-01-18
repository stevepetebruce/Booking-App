import React, { useState, useRef, useEffect } from "react";

import { adminVenue, editVenue } from "../../actions/venue";
import VenueEditForm from "../../components/forms/VenueEditForm";

// params
import { useParams } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// toast
import { toast } from "react-toastify";

const EditVenue = () => {
	// params
	const { id } = useParams();
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

	const [preview, setPreview] = useState(
		"https://via.placeholder.com/200x200.png?text=PREVIEW"
	);

	console.log({ preview });

	useEffect(() => {
		getVenue();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getVenue = async () => {
		try {
			const res = await adminVenue(id);
			console.log(res.data);

			// set form data
			titleRef.current.value = res.data.title;
			contentRef.current.value = res.data.content;
			priceRef.current.value = res.data.price;
			setPreview(
				`${process.env.REACT_APP_API}/venue/image/${res.data._id}`
			);

			setValues({
				image: res.data.image,
				people: res.data.people,
				from: res.data.from,
				to: res.data.to,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onDateChange = (date, dateString) => {
		console.log(date, dateString);
		setValues({ ...values, from: dateString[0], to: dateString[1] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("handleEditVenue");

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

			const res = await editVenue(formData, token, id);

			console.log("VENUE EDIT RES", res);

			toast.success(`${res.data.title} has been updated`);
		} catch (err) {
			console.log(err.response.data);
			toast.error(err.response.data);
		}
	};

	return (
		<div className="container">
			<h2>Edit Venue</h2>

			<VenueEditForm
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

export default EditVenue;
