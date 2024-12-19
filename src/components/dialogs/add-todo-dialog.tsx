import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTodoStore } from "@/store/todo-store";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface AddTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTodoDialog({ open, onOpenChange }: AddTodoDialogProps) {
  const [title, setTitle] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const { tagId } = useParams<{ tagId: string }>();
  const { tags, addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      title,
      completed: false,
      tags: tagId ? [tagId] : selectedTag ? [selectedTag] : [],
    });
    setTitle("");
    setSelectedTag("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            Add a new todo to your list
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {!tagId && (
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Select
                value={selectedTag}
                onValueChange={setSelectedTag}
              >
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
          )}
          <Button type="submit">Add Todo</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}