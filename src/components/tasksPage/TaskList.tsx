import { useState } from "react";
import { DeleteImg } from "../../icons/DeleteImg";
import { EditImg } from "../../icons/EditImg";
import { IDirectory } from "../../interfaces/todolist.interface";
import { changeTaskStatus, deleteTask } from "../../redux/toDoSlice";
import { useDispatch } from "react-redux";
import { TaskForm } from "./TaskForm";

export const TaskList = ({
	currentDirectory,
	setShowNewTaskForm,
}: {
	currentDirectory: IDirectory;
	setShowNewTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [editTaskIndex, setEditTaskIndex] = useState<number | undefined>(undefined);
	const dispatch = useDispatch();
	const checkTaskPriority = (priority: string) => {
		switch (priority) {
			case "priority 1":
				return "task priority-1";
			case "priority 2":
				return "task priority-2";
			case "priority 3":
				return "task priority-3";
			default:
				break;
		}
	};

	return (
		<ul className="task-list">
			{currentDirectory.thisDirectoryTasks.map((task, index) => {
				return index !== editTaskIndex ? (
					!task.completed && (
						<li
							key={task.taskId}
							className={checkTaskPriority(task.priority)}
							onClick={() => {
								dispatch(
									changeTaskStatus({
										index: task.taskId,
										currentDirectoryId: currentDirectory.id,
									})
								);
							}}
						>
							<div className="task-container">
								<div className="task-main">
									<div className="task-wrapper">
										<input
											onChange={() => {
												dispatch(
													changeTaskStatus({
														index: task.taskId,
														currentDirectoryId: currentDirectory.id,
													})
												);
											}}
											onClick={(event) => event.stopPropagation()}
											className="checkbox"
											type="checkbox"
											name="checkbox"
											checked={task.completed}
											id="checkbox"
										/>
										<label htmlFor="checkbox" className="task-name">
											{task.taskName}
										</label>
									</div>
									<div className="task-options">
										<button
											className="task-edit"
											onClick={(event) => {
												event.stopPropagation();
												setEditTaskIndex(index);
											}}
										>
											<EditImg />
										</button>
										<button
											className="task-delete"
											onClick={(event) => {
												event.stopPropagation();
												dispatch(
													deleteTask({
														currentDirectoryId: currentDirectory.id,
														index,
														taskId: task.taskId,
													})
												);
											}}
										>
											<DeleteImg />
										</button>
									</div>
								</div>
								{task.description && <div className="task-description">{task.description}</div>}
							</div>
						</li>
					)
				) : (
					<TaskForm
						key={task.taskId}
						task={task}
						setShowNewTaskForm={setShowNewTaskForm}
						currentDirectory={currentDirectory}
						setEditTaskIndex={setEditTaskIndex}
						editTaskIndex={editTaskIndex}
					/>
				);
			})}
		</ul>
	);
};
