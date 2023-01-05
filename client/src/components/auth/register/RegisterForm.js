const RegisterForm = ({
	handleRegister,
	formRefs: {
		emailRef,
		firstNameRef,
		lastNameRef,
		passwordRef,
		password2Ref,
	},
}) => {
	return (
		<form onSubmit={handleRegister}>
			<div className="form-floating mb-3">
				<input
					type="email"
					className="form-control"
					id="floatingInputEmail"
					placeholder="name@example.com"
					ref={emailRef}
				/>
				<label htmlFor="floatingInputEmail">Email address</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					className="form-control"
					id="floatingInputFirst"
					placeholder="First Name"
					ref={firstNameRef}
				/>
				<label htmlFor="floatingInputFirst">First Name</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					className="form-control"
					id="floatingInputLast"
					placeholder="Last Name"
					ref={lastNameRef}
				/>
				<label htmlFor="floatingInputLast">Last Name</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="password"
					className="form-control"
					id="floatingPassword"
					placeholder="Password"
					ref={passwordRef}
				/>
				<label htmlFor="floatingPassword">Password</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="password"
					className="form-control"
					id="floatingPassword2"
					placeholder="Confirm Password"
					ref={password2Ref}
				/>
				<label htmlFor="floatingPassword2">Confirm Password</label>
			</div>

			<button className="w-100 btn btn-lg btn-primary" type="submit">
				Sign Up
			</button>
		</form>
	);
};

export default RegisterForm;
