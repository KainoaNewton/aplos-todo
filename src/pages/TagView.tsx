import { AddTodoDialog } from "@/components/dialogs/add-todo-dialog";
import { TodoItem } from "@/components/todo/todo-item";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/todo-store";
import { useState } from "react";
import { useParams } from "react-router-dom";

const TagView = () => {
  const { tagId } = useParams<{ tagId: string }>();
  const { todos, tags } = useTodoStore();
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  
  const tag = tags.find((t) => t.id === tagId);
  const filteredTodos = todos.filter((todo) => todo.tags.includes(tagId!));

  if (!tag) return null;

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">{tag.name}</h1>
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
        </div>
        <Button onClick={() => setIsAddTodoOpen(true)}>Add Todo</Button>
      </div>
      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <AddTodoDialog open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen} />
    </div>
  );
};

export default TagView;