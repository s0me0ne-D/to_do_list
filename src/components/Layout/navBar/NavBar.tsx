import "./navBar.scss";
import { useEffect, useRef, useState } from "react";
import { NewdirectoryForm } from "./NewDirectoryForm";
import { NavLink, useParams } from "react-router-dom";
import { PlusImg } from "../../../icons/PlusImg";
import { useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
import { setListToLocalStorage } from "../../../hooks/setListToLocalStorage";

export const NavBar = ({ changeClassName }: { changeClassName: any }) => {
	const directories = useSelector((state: RootStore) => state.toDoList);
	const params = useParams();
	const newDirectoryRef = useRef(null);
	const addNewDirectoryRef = useRef(null);
	const body = document.querySelector("body");
	const [stateNewdirectory, setStateNewdirectory] = useState(false);

	const createNewdirectory = () => {
		setStateNewdirectory(!stateNewdirectory);
	};
	useEffect(() => {
		body?.addEventListener("click", () => {
			setStateNewdirectory(false);
		});
	}, [body]);
	useEffect(() => {
		setListToLocalStorage("ToDoList", directories);
	}, [directories]);
	return (
		<div className={changeClassName ? "navBar" : "navBar activeNavBar"}>
			<ul className="directory">
				{directories.map((directory, index) => (
					<li
						key={directory.id}
						className={`direcrory-name ${
							params.directoryId === directories[index].id ? "active" : ""
						}`}
					>
						<NavLink to={`/${directory.title}-${directory.id}`} className={"navBar-link"}>
							{directory.title}
						</NavLink>
					</li>
				))}
				{stateNewdirectory ? (
					<NewdirectoryForm
						newDirectoryRef={newDirectoryRef}
						showDirectorie={setStateNewdirectory}
					/>
				) : null}
			</ul>
			<button
				ref={addNewDirectoryRef}
				type="button"
				className="add-new-list-button"
				onClick={(event) => {
					createNewdirectory();
					event.stopPropagation();
				}}
			>
				<PlusImg /> <span>Add new list</span>
			</button>
		</div>
	);
};
