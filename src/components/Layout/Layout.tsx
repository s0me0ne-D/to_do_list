import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { NavBar } from "./navBar/NavBar";
import { useState } from "react";

export const Layout = () => {
	const [activeNavBar, setActiveNavBar] = useState(true);
	const showNavBar = () => setActiveNavBar((prev) => !prev);

	return (
		<>
			<Header onClick={showNavBar} />
			<div className="main">
				<NavBar changeClassName={activeNavBar} />
				<Outlet />
			</div>
		</>
	);
};
