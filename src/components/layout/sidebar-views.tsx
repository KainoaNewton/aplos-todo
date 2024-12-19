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
import { AddViewDialog } from "@/components/dialogs/add-view-dialog";
import { useNavigate } from "react-router-dom";

export function SidebarViews() {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { views } = useTodoStore();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-4">
        <SidebarGroupLabel>Views</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsViewDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {views.map((view) => (
            <SidebarMenuItem key={view.id}>
              <SidebarMenuButton
                onClick={() => navigate(`/view/${view.id}`)}
                className="w-full"
              >
                <span>{view.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <AddViewDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} />
    </SidebarGroup>
  );
}