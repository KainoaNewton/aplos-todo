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
import { useToast } from "@/hooks/use-toast";

interface EditTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tagId: string;
}

export function EditTagDialog({ open, onOpenChange, tagId }: EditTagDialogProps) {
  const { tags, updateTag, deleteTag } = useTodoStore();
  const { toast } = useToast();
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

  const handleDelete = () => {
    if (!tag) return;
    
    const deletedTag = { ...tag };
    deleteTag(tagId);
    
    toast({
      title: "Tag deleted",
      description: "The tag has been deleted",
      action: (
        <Button
          onClick={() => {
            updateTag(deletedTag.id, deletedTag);
            toast({
              title: "Tag restored",
              description: "The tag has been restored",
            });
          }}
        >
          Undo
        </Button>
      ),
    });
    
    onOpenChange(false);
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
          <div className="flex justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}