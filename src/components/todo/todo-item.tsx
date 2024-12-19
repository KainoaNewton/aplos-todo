import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTodoStore } from "@/store/todo-store";
import { Todo } from "@/types/todo";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, updateTodo, tags } = useTodoStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editTag, setEditTag] = useState(todo.tags[0] || "");

  const handleToggle = () => {
    if (!todo.completed) {
      toast("Todo marked as done", {
        action: {
          label: "Undo",
          onClick: () => toggleTodo(todo.id),
        },
      });
    }
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    updateTodo(todo.id, {
      ...todo,
      title: editTitle,
      tags: editTag ? [editTag] : [],
    });
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4 rounded-lg border bg-card p-4 shadow-sm">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
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
            onClick={() => setIsEditOpen(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Todo title"
              />
            </div>
            <div className="space-y-2">
              <Select value={editTag} onValueChange={setEditTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEdit} className="w-full">
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}