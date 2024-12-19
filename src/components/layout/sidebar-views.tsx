import { ChartNoAxesGantt, MoreVertical, Plus } from "lucide-react";
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
import { ViewSettingsDialog } from "../dialogs/view-settings-dialog";

export function SidebarViews() {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingView, setEditingView] = useState<string | null>(null);
  const { views } = useTodoStore();
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
                className="w-full group/item relative hover:bg-accent"
              >
                <div className="flex items-center flex-1">
                  <ChartNoAxesGantt className="h-4 w-4 mr-2" />
                  <span>{view.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingView(view.id);
                  }}
                  className="h-6 w-6 opacity-0 group-hover/item:opacity-100 absolute right-1 hover:bg-accent"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <AddViewDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} />
      {editingView && (
        <ViewSettingsDialog
          open={!!editingView}
          onOpenChange={() => setEditingView(null)}
          view={views.find((v) => v.id === editingView)!}
        />
      )}
    </SidebarGroup>
  );
}