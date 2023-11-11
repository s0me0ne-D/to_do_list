import { IDirectory } from "../interfaces/todolist.interface";

export const setListToLocalStorage = (key: string, value: IDirectory[]) => {
	const list = JSON.stringify(value);
	localStorage.setItem(key, list);
};
