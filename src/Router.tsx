import { createHashRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { TasksPage } from "./components/tasksPage/TasksPage";

export const router = createHashRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/:directoryId",
				element: <TasksPage />,
			},
		],
	},
]);
