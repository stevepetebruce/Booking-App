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

export const venues = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/venues`);
};
