import { configureStore } from "@reduxjs/toolkit";
import { toDoReducer } from "./toDoSlice";

export const store = configureStore({
	reducer: {
		toDoList: toDoReducer,
	},
});
export type RootStore = ReturnType<typeof store.getState>;
