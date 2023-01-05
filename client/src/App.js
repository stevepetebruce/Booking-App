import { BrowserRouter, Routes, Route } from "react-router-dom";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "./components/TopNav";
import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
	return (
		<BrowserRouter>
			<TopNav />
			<ToastContainer position="bottom-right" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login/*" element={<Login />} />
				<Route path="register/*" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
