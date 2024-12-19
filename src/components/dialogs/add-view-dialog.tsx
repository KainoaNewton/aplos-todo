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
import { useTodoStore } from "@/store/todo-store";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface AddViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddViewDialog({ open, onOpenChange }: AddViewDialogProps) {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { tags, addView } = useTodoStore();

  // Set all tags as selected by default when dialog opens
  useEffect(() => {
    if (open && tags.length > 0) {
      setSelectedTags(tags.map(tag => tag.id));
    } else if (open) {
      // If there are no tags, initialize with empty array
      setSelectedTags([]);
    }
  }, [open, tags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addView({
      id: crypto.randomUUID(),
      name: name.trim(),
      filter: {
        tags: selectedTags,
      },
    });
    
    setName("");
    setSelectedTags([]);
    onOpenChange(false);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) => {
      // If this is the last tag and we're trying to uncheck it, prevent the action
      if (prev.length === 1 && prev.includes(tagId)) {
        return prev;
      }
      return prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add View</DialogTitle>
          <DialogDescription>
            Create a new view with custom filters
          </DialogDescription>
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
            <Label>Filter by Tags</Label>
            <div className="space-y-2">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => handleTagToggle(tag.id)}
                  />
                  <Label htmlFor={tag.id}>{tag.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Add View</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}