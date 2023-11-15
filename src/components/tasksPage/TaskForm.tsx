import { useEffect, useState } from "react";
import "./newTaskForm.scss";
import { IDirectory, ITask } from "../../interfaces/todolist.interface";
import { useDispatch } from "react-redux";
import { addNewTask, editTask } from "../../redux/toDoSlice";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export const TaskForm = ({
	setShowNewTaskForm,
	currentDirectory,
	task,
	setEditTaskIndex,
	editTaskIndex,
}: {
	currentDirectory: IDirectory;
	task?: ITask;
	setEditTaskIndex?: any;
	editTaskIndex?: number;
	setShowNewTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();
	const formRef = useOutsideClick(() => {
		if (setEditTaskIndex) {
			setEditTaskIndex(undefined);
		} else {
			setShowNewTaskForm(false);
		}
	});
	const [taskId, setTaskId] = useState(task ? task.taskId : "");

	const [taskName, setTaskName] = useState(task ? task.taskName : "");
	const [description, setDescription] = useState(task ? task.description : "");
	const [priority, setPriority] = useState(task ? task.priority : "priority 3");
	const [errorValueClassName, setErrorValueClassName] = useState("");

	const cancelClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (setEditTaskIndex) {
			setEditTaskIndex(undefined);
		} else {
			setShowNewTaskForm(false);
		}

		event.preventDefault();
		event.stopPropagation();
	};

	const addTask = (
		event:
			| React.FormEvent<HTMLFormElement>
			| React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.stopPropagation();
		event.preventDefault();
		if (taskName === "") {
			setErrorValueClassName("error-value");
			return;
		}
		dispatch(
			addNewTask({
				index: currentDirectory.id,
				task: {
					completed: false,
					priority: priority,
					taskId: taskId,
					taskName: taskName,
					description: description,
				},
			})
		);
		setShowNewTaskForm(false);
	};
	const editCurrentTask = (
		event:
			| React.FormEvent<HTMLFormElement>
			| React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.stopPropagation();
		event.preventDefault();

		if (taskName === "") {
			setErrorValueClassName("error-value");
			return;
		}
		dispatch(
			editTask({
				taskIndex: editTaskIndex,
				directorieId: currentDirectory.id,
				task: {
					completed: false,
					priority: priority,
					taskId: taskId,
					taskName: taskName,
					description: description,
				},
			})
		);
		setEditTaskIndex(undefined);
		setShowNewTaskForm(false);
	};

	const keyDownHandler = (
		event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSelectElement>
	) => {
		if (event.key === "Enter") {
			setEditTaskIndex ? editCurrentTask(event) : addTask(event);
		}
	};

	useEffect(() => {
		if (!task) {
			setTaskId(Math.floor(Math.random() * 100000).toString());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (taskName.length > 0 && errorValueClassName !== "") setErrorValueClassName("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [taskName]);

	return (
		<div className="new-task" ref={formRef as any}>
			<form
				action="submit"
				onSubmit={(event) => {
					setEditTaskIndex ? editCurrentTask(event) : addTask(event);
				}}
				name="form"
			>
				<input
					type="text"
					placeholder="Task name"
					name="Task-name"
					className={`new-task-name ${errorValueClassName}`}
					value={taskName}
					onChange={(event) => setTaskName(event.target.value)}
					onKeyDown={keyDownHandler}
					required={true}
				/>
				<textarea
					placeholder="Description"
					name="Description"
					className="new-task-description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
				<div className="new-task-footer">
					<select
						defaultValue={priority}
						name="priority"
						id="new-task-priority"
						onChange={(event) => setPriority(event.target.value)}
						onKeyDown={keyDownHandler}
					>
						<option value="priority 1">Priority 1</option>
						<option value="priority 2">Priority 2</option>
						<option value="priority 3">Priority 3</option>
					</select>
					<div className="new-task-buttons">
						<button className="new-task-cancel" onClick={cancelClickHandler}>
							Cancel
						</button>
						<button
							type="submit"
							className="new-task-add"
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								setEditTaskIndex ? editCurrentTask(event) : addTask(event);
							}}
						>
							{editTaskIndex !== undefined ? "Edit" : "Add"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
