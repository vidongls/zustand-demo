import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ITodo {
	id: string;
	description: string;
	completed: boolean;
}

interface TodoState {
	todos: ITodo[];
	addTodo: (description: string) => void;
	removeTodo: (id: string) => void;
	updateTodo: (todo: ITodo) => void;
	completeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
	devtools(
		persist(
			(set) => ({
				todos: [],
				addTodo: (description) =>
					set((state: TodoState) => ({
						todos: [
							...state.todos,
							{
								id: new Date().toISOString(),
								description,
								completed: false,
							} as ITodo,
						],
					})),
				removeTodo: (id) =>
					set((state: TodoState) => ({
						todos: state.todos.filter((todo) => todo.id !== id),
					})),
				updateTodo: (todo: ITodo) =>
					set((state: TodoState) => {
						console.log("todo", todo);
						const newListTodos = state.todos.map((todoItem) =>
							todoItem.id === todo.id
								? { ...todoItem, description: todo.description, completed: todo.completed }
								: todoItem
						);
						return {
							todos: newListTodos,
						};
					}),
				completeTodo: (id: string) =>
					set((state) => ({
						todos: state.todos.map((todoItem) =>
							todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem
						),
					})),
			}),
			{
				name: "todos-storage",
			}
		),
		{ name: "MyTodoStore" }
	)
);
