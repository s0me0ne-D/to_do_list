import { useState, useEffect } from "react";

export const useLocalStorage = (initialValue: any, key: string) => {
	const getTasks = () => {
		const storage = localStorage.getItem(key);
		if (storage) {
			return JSON.parse(storage);
		}
		return initialValue;
	};
	const [value, setValue] = useState(getTasks);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);
	return [value, setValue];
};
