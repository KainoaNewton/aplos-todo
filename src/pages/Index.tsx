import { AddTodo } from "@/components/todo/add-todo";
import { TodoItem } from "@/components/todo/todo-item";
import { useTodoStore } from "@/store/todo-store";

const Index = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Todos</h1>
        <AddTodo />
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Index;