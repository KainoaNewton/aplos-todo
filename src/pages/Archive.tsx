import { TodoItem } from "@/components/todo/todo-item";
import { useTodoStore } from "@/store/todo-store";

const Archive = () => {
  const { archivedTodos } = useTodoStore();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Archive</h1>
      </div>
      <div className="space-y-4">
        {archivedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Archive;