import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodoStore } from "@/store/todo-store";
import { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, tags } = useTodoStore();

  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
      <div className="ml-auto flex items-center space-x-2">
        {todo.tags.map((tagId) => {
          const tag = tags.find((t) => t.id === tagId);
          if (!tag) return null;
          return (
            <span
              key={tag.id}
              className="rounded-full px-2 py-1 text-xs"
              style={{ backgroundColor: tag.color + "40" }}
            >
              {tag.name}
            </span>
          );
        })}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTodo(todo.id)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}