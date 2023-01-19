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

export const getAccountStatus = async (token) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/get-account-status`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const getAccountBalance = async (token) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/get-account-balance`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

// Payout Setting (Stripe Onboarding) for Owners
export const payoutSetting = async (token) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/payout-setting`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

// Get Stripe Session ID for checkout process (payment) for buyers
export const getSessionId = async (token, venueId) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-checkout-session`,
		{ venueId },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
