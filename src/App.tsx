import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import "./themes/variables.scss";

const App = () => {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
