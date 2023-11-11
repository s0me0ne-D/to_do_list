import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getList } from "../hooks/getList";
import { IDirectory, ITask } from "../interfaces/todolist.interface";

const initialState: IDirectory[] = getList("ToDoList");
export const toDoSlice = createSlice({
	name: "ToDo",
	initialState,
	reducers: {
		addNewdirectory: (state, action: PayloadAction<IDirectory>) => {
			state.push(action.payload);
		},
		addNewTask: (state, action: PayloadAction<{ index: string; task: ITask }>) => {
			state.forEach((directory) => {
				if (directory.id === action.payload.index) {
					directory.thisDirectoryTasks.push(action.payload.task);
				}
			});
		},
		changeTaskStatus: (
			state,
			action: PayloadAction<{ index: string; currentDirectoryId: string }>
		) => {
			state.forEach((directory) => {
				if (directory.id === action.payload.currentDirectoryId) {
					directory.thisDirectoryTasks.forEach((task) => {
						if (task.taskId === action.payload.index) {
							task.completed = !task.completed;
						}
					});
				}
			});
		},

		deleteTask: (
			state,
			action: PayloadAction<{ index: number; taskId: string; currentDirectoryId: string }>
		) => {
			const currentDirectoryIndex = state.findIndex(
				(directory) => directory.id === action.payload.currentDirectoryId
			);
			state[currentDirectoryIndex].thisDirectoryTasks.splice(action.payload.index, 1);
		},
		deleteDirectory: (state, action: PayloadAction<{ directorieId: string }>) => {
			state.forEach((directorie) => {
				const index = state.findIndex(
					(directorie) => directorie.id === action.payload.directorieId
				);
				if (directorie.id === action.payload.directorieId) {
					state.splice(index, 1);
				}
			});
		},
		editTask: (
			state,
			action: PayloadAction<{ taskIndex: number | undefined; directorieId: string; task: ITask }>
		) => {
			const currentDirectoryIndex = state.findIndex(
				(directorie) => directorie.id === action.payload.directorieId
			);
			const currentDirectory = state[currentDirectoryIndex];
			if (action.payload.taskIndex !== undefined)
				currentDirectory.thisDirectoryTasks[action.payload.taskIndex] = action.payload.task;
		},
	},
});

export const toDoReducer = toDoSlice.reducer;
export const {
	addNewdirectory,
	addNewTask,
	changeTaskStatus,
	deleteTask,
	deleteDirectory,
	editTask,
} = toDoSlice.actions;
