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
import { useState } from "react";

interface AddTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTagDialog({ open, onOpenChange }: AddTagDialogProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const addTag = useTodoStore((state) => state.addTag);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTag({ name, color });
    setName("");
    setColor("#000000");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
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
          <Button type="submit">Add Tag</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}