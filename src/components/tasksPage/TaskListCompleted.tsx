import { useDispatch } from "react-redux";
import { DeleteImg } from "../../icons/DeleteImg";
import { IDirectory } from "../../interfaces/todolist.interface";
import { changeTaskStatus, deleteTask } from "../../redux/toDoSlice";

export const CompletedTaskList = ({ currentDirectory }: { currentDirectory: IDirectory }) => {
	const dispatch = useDispatch();
	return (
		<div className="tasks">
			<ul className="task-list">
				{currentDirectory.thisDirectoryTasks.map((task, index) => {
					if (task.completed) {
						return (
							<li
								key={task.taskId}
								className={"task checked"}
								onClick={() => {
									dispatch(
										changeTaskStatus({
											currentDirectoryId: currentDirectory.id,
											index: task.taskId,
										})
									);
								}}
							>
								<div className="task-container">
									<div className="task-main">
										<div className="task-wrapper">
											<input
												checked={task.completed}
												onChange={() => {
													dispatch(
														changeTaskStatus({
															currentDirectoryId: currentDirectory.id,
															index: task.taskId,
														})
													);
												}}
												onClick={(event) => event.stopPropagation()}
												className="checkbox"
												type="checkbox"
												id="checkbox"
											/>
											<label htmlFor="checkbox" className="task-name">
												{task.taskName}
											</label>
										</div>
										<div className="task-options">
											<button
												className="task-delete"
												onClick={(event) => {
													event.stopPropagation();
													dispatch(
														deleteTask({
															index,
															currentDirectoryId: currentDirectory.id,
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
						);
					}
				})}
			</ul>
		</div>
	);
};
