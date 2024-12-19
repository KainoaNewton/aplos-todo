import { Plus, View, Pencil, Trash } from "lucide-react";
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
  const { views, deleteView } = useTodoStore();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel className="text-base font-medium">Views</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsViewDialogOpen(true)}
          className="h-8 w-8 hover:bg-sidebar-accent"
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
                className="w-full group relative"
              >
                <View className="h-4 w-4 mr-2" />
                <span>{view.name}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteView(view.id);
                    }}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <AddViewDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} />
    </SidebarGroup>
  );
}