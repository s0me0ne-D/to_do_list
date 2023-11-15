import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewdirectory } from "../../../redux/toDoSlice";

export const NewdirectoryForm = ({
	newDirectoryRef,
	showDirectorie,
}: {
	newDirectoryRef: React.RefObject<HTMLLIElement>;
	showDirectorie: any;
}) => {
	const [value, setValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (inputRef.current !== null) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	return (
		<li
			ref={newDirectoryRef}
			className="direcrory-name"
			onClick={(event) => event.stopPropagation()}
		>
			<form
				action="submit"
				onSubmit={(event) => {
					dispatch(
						addNewdirectory({
							id: Math.floor(Math.random() * 100000).toString(),
							thisDirectoryTasks: [],
							title: value,
						})
					);
					setValue("");
					showDirectorie(false);
					event.preventDefault();
					event.stopPropagation();
				}}
			>
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
					}}
					required={true}
					name="directorie-name"
				/>
			</form>
		</li>
	);
};
