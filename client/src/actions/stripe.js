import axios from "axios";

export const registerConnectAccount = async (token) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/connect-register`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
