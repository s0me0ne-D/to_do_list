export interface IDirectory {
	id: string;
	title: string;
	thisDirectoryTasks: ITask[];
}

export interface ITask {
	taskId: string;
	taskName: string;
	description?: string;
	priority: string;
	completed: boolean;
}
