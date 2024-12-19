import { Plus, Search, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function SidebarMenuItems() {
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            // TODO: Open add todo modal
          }}
          className="w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Todo</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            // TODO: Open search modal
          }}
          className="w-full"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => navigate("/")} className="w-full">
          <Inbox className="h-4 w-4" />
          <span>Inbox</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}