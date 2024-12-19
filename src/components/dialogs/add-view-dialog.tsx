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

interface AddViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddViewDialog({ open, onOpenChange }: AddViewDialogProps) {
  const [name, setName] = useState("");
  const addView = useTodoStore((state) => state.addView);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addView({
      name,
      filter: {},
    });
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add View</DialogTitle>
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
          <Button type="submit">Add View</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}