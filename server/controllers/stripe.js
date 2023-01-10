export const registerConnectAccount = async (req, res) => {
	// Request user
	console.log("REGISTER CONNECT ACCOUNT REQ USER", req.auth);
	res.json({ ok: true });
};
