import { Plus, Search, Inbox, Archive } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddTodoDialog } from "../dialogs/add-todo-dialog";

export function SidebarMenuItems() {
  const navigate = useNavigate();
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setIsAddTodoOpen(true)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => navigate("/archive")}
            className="w-full"
          >
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <AddTodoDialog open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen} />
    </>
  );
}