type FullTodo = {
  id: number;
  task: string;
  done: boolean;
  createdAt: string;
};

export type Todo = Partial<FullTodo>;

export type ToDoRequest = {
  id: number;
  todo: Todo;
};
