import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import TopNav from "./components/TopNav";
import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Redux
import { Provider } from "react-redux";

function App() {
	return (
		<BrowserRouter>
			<TopNav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login/*" element={<Login />} />
				<Route path="register/*" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
