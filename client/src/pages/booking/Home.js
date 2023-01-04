import React from "react";

// Redux - useSelector
import { useSelector } from "react-redux";

function Home() {
	// Redux - useSelector
	const state = useSelector((state) => state);

	return <div className="container">Home {JSON.stringify(state)}</div>;
}

export default Home;
