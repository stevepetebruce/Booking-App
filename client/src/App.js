import { BrowserRouter, Routes, Route } from "react-router-dom";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "./components/nav/TopNav";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import Home from "./pages/booking/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import DashboardSeller from "./pages/user/DashboardSeller";
import NewVenue from "./pages/venues/NewVenue";
import StripeCallback from "./pages/stripe/StripeCallback";
import VenueDetail from "./pages/booking/Detail";

function App() {
	return (
		<BrowserRouter basename="/">
			<TopNav />
			<ToastContainer position="bottom-right" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login/*" element={<Login />} />
				<Route path="register/*" element={<Register />} />
				<Route path="/venue/:slug" element={<VenueDetail />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="dashboard/" element={<Dashboard />} />
					<Route
						path="dashboard/seller"
						element={<DashboardSeller />}
					/>
					<Route path="venues/new" element={<NewVenue />} />
					<Route
						path="stripe/callback"
						element={<StripeCallback />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
