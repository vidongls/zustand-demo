import React, { useState } from "react";
import "./App.css";
import { ITodo, useTodoStore } from "./store/useTodoStore";

function App() {
	const { todos, addTodo, removeTodo, updateTodo, completeTodo } = useTodoStore();
	const [input, setInput] = useState("");
	const [itemUpdate, setItemUpdate] = useState<ITodo>({ id: "", description: "", completed: false });
	const [validate, setValidate] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	const onChangeInput = (value: string) => {
		setInput(value);
		setValidate(false);
	};

	const handleAddTodo = () => {
		if (!input) {
			setValidate(true);
			return;
		}
		addTodo(input);
		setInput("");
	};

	const handleUpdateTodo = (todo: ITodo) => {
		setIsUpdate(true);
		setInput(todo.description);
		setItemUpdate(todo);
        setValidate(false)
	};

	const onUpdateTodo = () => {
		updateTodo({
			...itemUpdate,
			description: input,
		});
		setIsUpdate(false);
		setInput("");
	};

	return (
		<div className="w-screen h-screen p-6 flex justify-center">
			<div className="text-center flex flex-col">
				<h1 className="text-3xl font-medium text-green-700 mb-3">Todo List</h1>
				<div className="flex">
					<input
						type="text"
						className="hidden sm:flex items-center w-96 text-left space-x-3 px-4 h-10 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-tl-lg rounded-bl-lg text-slate-400"
						onChange={(e) => onChangeInput(e.target.value)}
						value={input}
					/>
					{isUpdate && todos.length > 0 ? (
						<button
							className="h-10 px-6 font-semibold bg-blue-500 text-white rounded-tr-lg rounded-br-lg hover:bg-blue-400"
							onClick={onUpdateTodo}
						>
							Edit
						</button>
					) : (
						<button
							className="h-10 px-6 font-semibold bg-blue-500 text-white rounded-tr-lg rounded-br-lg hover:bg-blue-400"
							onClick={handleAddTodo}
						>
							Add
						</button>
					)}
				</div>
				{validate && <p className="text-red-600">Input invalid!</p>}
				<ul className="mt-4">
					{todos?.map((todo) => (
						<li className="bg-blue-50 rounded-lg p-3 font-medium text-gray-700 flex justify-between mb-3" key={todo.id}>
							<div className="flex align-center">
								<input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} />
								<span className={`ml-2 ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.description}</span>
							</div>
							<div>
								<span
									className="mr-2 text-green-600 hover:text-green-500 cursor-pointer"
									onClick={() => handleUpdateTodo(todo)}
								>
									Update
								</span>
								<button
									disabled={todo.id === itemUpdate.id}
									className={`text-red-500 hover:text-red-400 cursor-pointer ${
										todo.id === itemUpdate.id ? " cursor-not-allowed" : ""
									}`}
									onClick={() => removeTodo(todo.id)}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;

