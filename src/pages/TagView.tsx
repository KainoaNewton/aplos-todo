import { AddTodoDialog } from "@/components/dialogs/add-todo-dialog";
import { EditTagDialog } from "@/components/dialogs/edit-tag-dialog";
import { TodoItem } from "@/components/todo/todo-item";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/todo-store";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const TagView = () => {
  const { tagId } = useParams<{ tagId: string }>();
  const { todos, tags } = useTodoStore();
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [isEditTagOpen, setIsEditTagOpen] = useState(false);
  
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
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditTagOpen(true)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsAddTodoOpen(true)}>Add Todo</Button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <AddTodoDialog open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen} />
      <EditTagDialog
        open={isEditTagOpen}
        onOpenChange={setIsEditTagOpen}
        tagId={tagId!}
      />
    </div>
  );
};

export default TagView;