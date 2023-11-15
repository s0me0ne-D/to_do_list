import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void) => {
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const handlerClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
				console.log("click");
			}
		};

		document.addEventListener("mousedown", handlerClickOutside);
		return () => {
			document.removeEventListener("mousedown", handlerClickOutside);
		};
	}, [callback]);
	return ref;
};
