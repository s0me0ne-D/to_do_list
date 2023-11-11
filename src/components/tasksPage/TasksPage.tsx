import "./tasksPage.scss";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DeleteImg } from "../../icons/DeleteImg";
import { TaskForm } from "./TaskForm";
import { PlusImg } from "../../icons/PlusImg";
import { TaskList } from "./TaskList";
import { CompletedTaskList } from "./TaskListCompleted";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import { deleteDirectory } from "../../redux/toDoSlice";

export const TasksPage = () => {
	const id = useParams();
	const dispatch = useDispatch();
	const directories = useSelector((state: RootStore) => state.toDoList);
	const [showNewTaskForm, setShowNewTaskForm] = useState(false);
	const [showCompletedTasks, setShowCompletedTasks] = useState(false);

	const currentDirectory = directories.find(
		(task) => `${task.title}-${task.id}` === id.directoryId
	);
	useEffect(() => {
		setShowCompletedTasks(false);
		setShowNewTaskForm(false);
	}, [id]);

	return (
		<>
			{currentDirectory ? (
				<main className="tasks-page">
					<div className="tasks">
						<div className="task-header">
							<h1 className="tasks-title">{currentDirectory.title}</h1>
							<div className="task-header-buttons">
								<NavLink
									to={"/"}
									className="task-directory-delete"
									onClick={() => {
										dispatch(deleteDirectory({ directorieId: currentDirectory.id }));
									}}
								>
									<DeleteImg />
								</NavLink>
								<button
									className="task-completed-button"
									onClick={() => setShowCompletedTasks((prev) => !prev)}
								>
									<div className="show-img">
										<div className="show-img-line1"></div>
										<div className={`show-img-line2 ${showCompletedTasks ? "active" : ""}`}></div>
									</div>
									Show competed
								</button>
							</div>
						</div>
						<TaskList currentDirectory={currentDirectory} setShowNewTaskForm={setShowNewTaskForm} />
						<button
							className="add-new-task"
							onClick={() => {
								setShowNewTaskForm(true);
							}}
						>
							<PlusImg /> <span>Add new task</span>
						</button>
					</div>
					{showNewTaskForm ? (
						<TaskForm setShowNewTaskForm={setShowNewTaskForm} currentDirectory={currentDirectory} />
					) : null}
					{showCompletedTasks ? <CompletedTaskList currentDirectory={currentDirectory} /> : null}
				</main>
			) : null}
		</>
	);
};
