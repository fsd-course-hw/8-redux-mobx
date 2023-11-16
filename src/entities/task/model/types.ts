export type Task = {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  authorId: string;
};

export type CreateTaskData = {
  title: string;
  description?: string;
  assigneeId?: string;
  authorId: string;
};

export type UpdateTaskData = {
  id: string;
  title?: string;
  authorId?: string;
  description?: string;
  assigneeId?: string;
};
