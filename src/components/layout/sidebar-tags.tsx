import { Plus } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

export function SidebarTags() {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const { tags } = useTodoStore();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-4">
        <SidebarGroupLabel className="text-sm font-medium">Tags</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsTagDialogOpen(true)}
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
                className="w-full pl-6"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span>{tag.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <AddTagDialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen} />
    </SidebarGroup>
  );
}