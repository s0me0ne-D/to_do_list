import "./navBar.scss";
import { useEffect, useState } from "react";
import { NewdirectoryForm } from "./NewDirectoryForm";
import { NavLink, useParams } from "react-router-dom";
import { PlusImg } from "../../../icons/PlusImg";
import { useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
import { setListToLocalStorage } from "../../../utils/setListToLocalStorage";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export const NavBar = ({ changeClassName }: { changeClassName: any }) => {
	const directories = useSelector((state: RootStore) => state.toDoList);
	const params = useParams();
	const [stateNewdirectory, setStateNewdirectory] = useState(false);

	const newDirectoryRef = useOutsideClick(() => {
		setStateNewdirectory(false);
	});
	const createNewdirectory = () => {
		setStateNewdirectory(!stateNewdirectory);
	};

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
