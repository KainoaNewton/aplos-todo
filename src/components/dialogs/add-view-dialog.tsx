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
import { useToast } from "@/hooks/use-toast";

interface AddViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddViewDialog({ open, onOpenChange }: AddViewDialogProps) {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { tags, addView } = useTodoStore();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setName("");
      setSelectedTags([]);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "View name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newView = {
      id: crypto.randomUUID(),
      name: name.trim(),
      filter: {
        tags: selectedTags,
      },
    };

    addView(newView);
    toast({
      title: "Success",
      description: "View created successfully",
    });
    onOpenChange(false);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }
      return [...prev, tagId];
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
              placeholder="Enter view name"
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
                  <Label htmlFor={tag.id} className="flex items-center space-x-2">
                    <span>{tag.name}</span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                  </Label>
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