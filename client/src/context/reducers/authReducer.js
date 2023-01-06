// Set the user and token to the redux store when the user logs in
let user = JSON.parse(localStorage.getItem("auth"));
const initialState = user
	? user // If user is logged in, set user and token to redux store
	: {
			// If user is not logged in, set user and token to null
			token: null,
			user: null,
	  };

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGGED_IN_USER":
			return {
				...state,
				...action.payload,
			};
		case "LOGOUT":
			return action.payload;
		default:
			return state;
	}
};

export default authReducer;
