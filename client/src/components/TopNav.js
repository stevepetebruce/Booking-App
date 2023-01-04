import React from "react";

import { Link } from "react-router-dom";

const TopNav = () => {
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

				<div className="col-md-3 text-end">
					<Link to="login" className="btn btn-outline-primary me-2">
						Login
					</Link>
					<Link to="register" className="btn btn-primary">
						Sign-up
					</Link>
				</div>
			</header>
		</div>
	);
};

export default TopNav;
