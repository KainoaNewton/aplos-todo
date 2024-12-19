import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTodoStore } from "@/store/todo-store";
import { View } from "@/types/todo";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { DeleteViewDialog } from "./delete-view-dialog";

interface ViewSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  view: View;
}

export function ViewSettingsDialog({
  open,
  onOpenChange,
  view,
}: ViewSettingsDialogProps) {
  const { tags, views, addView } = useTodoStore();
  const [name, setName] = useState(view.name);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    view.filter.tags || []
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedView: View = {
      ...view,
      name,
      filter: {
        ...view.filter,
        tags: selectedTags,
      },
    };
    addView(updatedView);
    onOpenChange(false);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Settings</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="View name"
              />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-colors",
                      selectedTags.includes(tag.id)
                        ? "hover:bg-primary/80"
                        : "hover:bg-muted"
                    )}
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DeleteViewDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        viewId={view.id}
      />
    </>
  );
}