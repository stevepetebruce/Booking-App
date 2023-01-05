import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Get/Post request actions
import { register } from "../../actions/auth";

import RegisterForm from "../../components/auth/register/RegisterForm";

function Register() {
	const navigate = useNavigate();

	const emailRef = useRef("");
	const firstNameRef = useRef("");
	const lastNameRef = useRef("");
	const passwordRef = useRef("");
	const password2Ref = useRef("");

	// Handle register form submit
	const handleRegister = async (e) => {
		e.preventDefault();
		// check passwords match
		const passwordsMatch =
			passwordRef.current.value === password2Ref.current.value
				? true
				: false;

		if (passwordsMatch === false) {
			console.log(passwordsMatch, "Passwords do not match");
			toast("Passwords do not match");
			return;
		}

		// Register user
		try {
			const response = register({
				email: emailRef.current.value,
				firstName: firstNameRef.current.value,
				lastName: lastNameRef.current.value,
				password: passwordRef.current.value,
			});
			console.log(response);
			toast("Registered successfully!");
		} catch (err) {
			console.log(err);
			if (err.response.status === 400) {
				toast(err.response.data);
				return;
			}
		}

		// Clear form
		emailRef.current.value = "";
		firstNameRef.current.value = "";
		lastNameRef.current.value = "";
		passwordRef.current.value = "";
		password2Ref.current.value = "";

		// Redirect to login
		navigate("/login");

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
