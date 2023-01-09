import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TopNav = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleLogout = () => {
		// Remove user and token from local storage
		window.localStorage.removeItem("auth");

		// Remove user and token from redux store
		dispatch({
			type: "LOGOUT",
			payload: null,
		});

		// Redirect to login page without react router
		window.location.href = "/login";
	};
	return (
		<div className="container">
			<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
				<a
					href="/"
					className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
					Brand
				</a>

				<ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
					<li>
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
				</ul>

				{!auth.user && !auth.token ? (
					<div className="col-md-3 text-end">
						<Link
							to="login"
							className="btn btn-outline-primary me-2">
							Login
						</Link>
						<Link to="register" className="btn btn-primary">
							Sign-up
						</Link>
					</div>
				) : (
					<div className="col-md-3 text-end">
						<a onClick={handleLogout} className="btn btn-primary">
							Logout
						</a>
					</div>
				)}
			</header>
		</div>
	);
};

export default TopNav;
