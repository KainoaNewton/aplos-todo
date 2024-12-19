import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTodoStore } from "@/store/todo-store";
import { useState } from "react";
import { AddTagDialog } from "@/components/dialogs/add-tag-dialog";
import { AddViewDialog } from "@/components/dialogs/add-view-dialog";
import { SettingsDialog } from "@/components/dialogs/settings-dialog";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { tags, views } = useTodoStore();
  const navigate = useNavigate();

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Button
            onClick={() => setIsSettingsOpen(true)}
            variant="ghost"
            className="w-full justify-start"
          >
            Settings
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between px-4">
              <SidebarGroupLabel>Tags</SidebarGroupLabel>
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
                      className="w-full"
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
          </SidebarGroup>

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
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <AddTagDialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen} />
      <AddViewDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} />
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}