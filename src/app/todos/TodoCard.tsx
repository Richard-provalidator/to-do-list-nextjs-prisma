import { Todo } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface TodoCardProps {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoCard({ todo, todos, setTodos }: TodoCardProps) {
  const deleteTodo = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (json.success) {
        setTodos(todos.filter((v) => v.id !== todo.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
      });
      const json = await res.json();

      if (json.success) {
        setTodos(todos.filter((v) => v.id !== todo.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="flex justify-between items-center p-3 border rounded">
      <span>{todo.content}</span>
      <button
        className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-400 transition"
        onClick={() => deleteTodo()}
      >
        수정
      </button>
      <button
        className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-400 transition"
        onClick={() => deleteTodo()}
      >
        삭제
      </button>
    </li>
  );
}
