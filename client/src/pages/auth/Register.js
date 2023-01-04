import { useRef, history } from "react";

// axios
import axios from "axios";

import RegisterForm from "../../components/auth/register/RegisterForm";

function Register() {
	const emailRef = useRef("");
	const firstNameRef = useRef("");
	const lastNameRef = useRef("");
	const passwordRef = useRef("");
	const password2Ref = useRef("");

	// check passwords match
	const passwordsMatch =
		passwordRef.current.value === password2Ref.current.value ? true : false;

	// Handle register form submit
	const handleRegister = async (e) => {
		e.preventDefault();

		if (!passwordsMatch) {
			console.log("Passwords do not match");
			return;
		}

		// Register user
		try {
			const response = await axios.post(
				"http://localhost:8000/api/users/register",
				{
					email: emailRef.current.value,
					firstName: firstNameRef.current.value,
					lastName: lastNameRef.current.value,
					password: passwordRef.current.value,
				}
			);
			console.log(response);
		} catch (err) {
			console.log(err);
		}

		// Clear form
		emailRef.current.value = "";
		firstNameRef.current.value = "";
		lastNameRef.current.value = "";
		passwordRef.current.value = "";
		password2Ref.current.value = "";

		// Redirect to login
		history.push("/login");

		// Show success message
		console.log("User registered");
	};

	return (
		<div className="container">
			{/* Bootstrap registration form */}
			<main className="form-signup w-100 m-auto">
				<h1 className="h3 mb-3 fw-normal">Register</h1>
				<RegisterForm
					handleRegister={handleRegister}
					formRefs={{
						emailRef,
						firstNameRef,
						lastNameRef,
						passwordRef,
						password2Ref,
					}}
				/>
			</main>
		</div>
	);
}

export default Register;
