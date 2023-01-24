import axios from "axios";

export const createVenue = async (venue, token) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-venue`,
		venue,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const editVenue = async (venue, token, id) => {
	console.log("venue", venue, "token", token);
	return await axios.put(
		`${process.env.REACT_APP_API}/admin/edit-venue/${id}`,
		venue,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const venue = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/venue/${slug}`);
};

export const venues = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/venues`);
};

// Check if the venue is already booked
export const isBooked = async (venueId, token) => {
	console.log({ token }, { venueId });
	return await axios.get(
		`${process.env.REACT_APP_API}/is-booked/${venueId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const adminVenue = async (id) => {
	return await axios.get(`${process.env.REACT_APP_API}/admin/venue/${id}`);
};

export const adminVenues = async (token) => {
	return await axios.get(`${process.env.REACT_APP_API}/admin/venues`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const userBookings = async (token) => {
	return await axios.get(`${process.env.REACT_APP_API}/admin/bookings`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

// Toggle venue enabled
export const enableVenue = async (venueId, token) => {
	console.log("venueId", venueId, "token", token);
	return await axios.put(
		`${process.env.REACT_APP_API}/admin/venue/enabled/${venueId}`,
		null,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
