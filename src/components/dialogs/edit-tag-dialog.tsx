import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTodoStore } from "@/store/todo-store";
import { useState, useEffect } from "react";

interface EditTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tagId: string;
}

export function EditTagDialog({ open, onOpenChange, tagId }: EditTagDialogProps) {
  const { tags, updateTag } = useTodoStore();
  const tag = tags.find((t) => t.id === tagId);
  const [name, setName] = useState(tag?.name || "");
  const [color, setColor] = useState(tag?.color || "#808080");

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setColor(tag.color);
    }
  }, [tag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag) {
      updateTag(tagId, { ...tag, name, color });
      onOpenChange(false);
    }
  };

  if (!tag) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}