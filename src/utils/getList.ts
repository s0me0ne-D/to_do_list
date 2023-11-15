export const getList = (key: string) => {
	const storage = localStorage.getItem(key);
	if (storage) {
		return JSON.parse(storage);
	} else return [];
};
