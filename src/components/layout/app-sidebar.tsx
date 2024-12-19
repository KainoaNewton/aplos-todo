import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { SettingsDialog } from "@/components/dialogs/settings-dialog";
import { SidebarMenuItems } from "./sidebar-menu-items";
import { SidebarViews } from "./sidebar-views";
import { SidebarTags } from "./sidebar-tags";
import { Settings } from "lucide-react";

export function AppSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Todo App</span>
            <Button
              onClick={() => setIsSettingsOpen(true)}
              variant="ghost"
              size="icon"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenuItems />
          <SidebarViews />
          <SidebarTags />
        </SidebarContent>
      </Sidebar>

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}