import { AddTodoDialog } from "@/components/dialogs/add-todo-dialog";
import { ViewSettingsDialog } from "@/components/dialogs/view-settings-dialog";
import { TodoItem } from "@/components/todo/todo-item";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/todo-store";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CustomView = () => {
  const { viewId } = useParams<{ viewId: string }>();
  const { todos, views } = useTodoStore();
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
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
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
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
      <ViewSettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        view={view}
      />
    </div>
  );
};

export default CustomView;