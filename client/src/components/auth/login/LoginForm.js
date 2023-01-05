import React, { useState, useEffect } from "react";

const LoginForm = ({ handleLogin, formRefs: { emailRef, passwordRef } }) => {
	// Disable submit button if email or password is empty
	const [isDisabled, setIsDisabled] = React.useState({
		email: true,
		password: true,
	});

	return (
		<form onSubmit={handleLogin}>
			<div className="form-floating mb-3">
				<input
					type="email"
					className="form-control"
					id="floatingInputEmail"
					placeholder="name@example.com"
					ref={emailRef}
					onChange={() =>
						setIsDisabled({
							email: false,
							password: isDisabled.password,
						})
					}
				/>
				<label htmlFor="floatingInputEmail">Email address</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="password"
					className="form-control"
					id="floatingPassword"
					placeholder="Password"
					ref={passwordRef}
					onChange={() =>
						setIsDisabled({
							email: isDisabled.email,
							password: false,
						})
					}
				/>
				<label htmlFor="floatingPassword">Password</label>
			</div>
			<button
				disabled={isDisabled.email || isDisabled.password}
				className="w-100 btn btn-lg btn-primary"
				type="submit">
				Submit
			</button>
		</form>
	);
};

export default LoginForm;
