import { AddTodo } from "@/components/todo/add-todo";
import { TodoItem } from "@/components/todo/todo-item";
import { useTodoStore } from "@/store/todo-store";
import { useParams } from "react-router-dom";

const CustomView = () => {
  const { viewId } = useParams<{ viewId: string }>();
  const { todos, views } = useTodoStore();
  const view = views.find((v) => v.id === viewId);
  const filteredTodos = todos.filter((todo) => {
    if (!view?.filter) return true;
    if (view.filter.tags?.length) {
      return todo.tags.some((tag) => view.filter.tags?.includes(tag));
    }
    return true;
  });

  if (!view) return null;

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{view.name}</h1>
        <AddTodo />
      </div>
      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default CustomView;