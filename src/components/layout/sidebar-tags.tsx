import { MoreVertical, Plus, Settings, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTodoStore } from "@/store/todo-store";
import { useState } from "react";
import { AddTagDialog } from "@/components/dialogs/add-tag-dialog";
import { EditTagDialog } from "@/components/dialogs/edit-tag-dialog";
import { useNavigate } from "react-router-dom";
import { DeleteTagDialog } from "@/components/dialogs/delete-tag-dialog";

export function SidebarTags() {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [deletingTag, setDeletingTag] = useState<string | null>(null);
  const { tags } = useTodoStore();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel className="text-base font-medium">Tags</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsTagDialogOpen(true)}
          className="h-8 w-8 hover:bg-sidebar-accent"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {tags.map((tag) => (
            <SidebarMenuItem key={tag.id}>
              <SidebarMenuButton
                onClick={() => navigate(`/tag/${tag.id}`)}
                className="w-full group relative hover:bg-accent"
              >
                <div className="flex items-center flex-1">
                  <Tag className="h-4 w-4 mr-2" />
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="ml-2">{tag.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingTag(tag.id);
                  }}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute right-1 hover:bg-accent"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <AddTagDialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen} />
      {editingTag && (
        <EditTagDialog
          open={!!editingTag}
          onOpenChange={() => setEditingTag(null)}
          tagId={editingTag}
        />
      )}
      {deletingTag && (
        <DeleteTagDialog
          open={!!deletingTag}
          onOpenChange={() => setDeletingTag(null)}
          tagId={deletingTag}
        />
      )}
    </SidebarGroup>
  );
}