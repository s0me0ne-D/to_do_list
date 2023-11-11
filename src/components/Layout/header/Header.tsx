import { useEffect, useState } from "react";
import { BurgerImg } from "../../../icons/BurgerImg";
import "./header.scss";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
export const Header = ({ onClick }: any) => {
	const [checked, setChecked] = useState(false);

	const [theme, setTheme] = useLocalStorage("", "theme");
	const bodyElement: HTMLBodyElement | null = document.querySelector("body");
	const whitchTheme = () => (theme === "" ? "light" : theme);
	bodyElement!.className = whitchTheme();
	const toggleTheme = () => {
		setTheme((prev: string) => (prev === "light" || prev === "" ? "dark" : "light"));
	};
	useEffect(() => setChecked(theme === "light" || theme === "" ? false : true), [theme]);

	return (
		<header className="header">
			<div className="header-wrapper">
				<button className="navButton" onClick={onClick}>
					<BurgerImg />{" "}
				</button>
				<div className="logo">ToDoList</div>
				<label className="switch">
					<input
						type="checkbox"
						checked={checked}
						onChange={() => {
							setChecked((prev) => !prev);
							toggleTheme();
						}}
					></input>
					<span className="slider round"></span>
				</label>
			</div>
		</header>
	);
};
