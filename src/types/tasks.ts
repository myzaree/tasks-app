export type Status = 0 | 1 | 10 | 11;

export type TaskType = {
  id: number;
  username: string;
  email: string;
  text: string;
  status: Status;
};

export type GetTasksSuccess = {
  tasks: TaskType[];
  total_task_count: string;
};

export type GetTasksError = string;

export type GetTasksParams = {
  page: number;
  sort_field?: string;
  sort_direction?: string;
};

export type CreateTaskError = {
  username?: string;
  email?: string;
  text?: string;
};

export type EditTaskBody = {
  token: string;
  text?: string;
  status?: Status;
};

export type EditTokenError = {
  token: string;
};
