// protected route with auth state in redux store and local storage (src/components/auth/ProtectedRoute.js)

// src/components/auth/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element: Component, ...rest }) => {
	// Redux - useSelector
	const { auth } = useSelector((state) => ({ ...state }));

	return auth && auth.token ? <Outlet {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
