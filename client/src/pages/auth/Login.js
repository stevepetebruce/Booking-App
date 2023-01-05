import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Get/Post request actions
import { login } from "../../actions/auth";

import LoginForm from "../../components/auth/login/LoginForm";

function Login() {
	const navigate = useNavigate();

	const emailRef = useRef("");
	const passwordRef = useRef("");

	const handleLogin = async (e) => {
		e.preventDefault();
		// Login user
		try {
			const response = await login({
				email: emailRef.current.value,
				password: passwordRef.current.value,
			});
			console.log(response);
			if (response.data) {
				// Save user and token to local storage
				window.localStorage.setItem(
					"auth",
					JSON.stringify(response.data.token)
				);

				// Save user and token to redux store
				// dispatch({
				// 	type: "LOGIN",
				// 	payload: response.data.token,
				// });
			}
			toast("Logged in successfully!");
		} catch (err) {
			console.log(err);
			if (err.response.status === 400) {
				toast(err.response.data);
				return;
			}
		}

		// Clear form
		emailRef.current.value = "";
		passwordRef.current.value = "";

		// Redirect to home
		navigate("/");
	};

	return (
		<div className="container">
			<main className="form-signup w-100 m-auto">
				<h1 className="h3 mb-3 fw-normal">Login</h1>
				<LoginForm
					handleLogin={handleLogin}
					formRefs={{
						emailRef,
						passwordRef,
					}}
				/>
			</main>
		</div>
	);
}

export default Login;
