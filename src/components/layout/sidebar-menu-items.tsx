import { Plus, Search, Inbox, Archive } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AddTodoDialog } from "../dialogs/add-todo-dialog";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../ui/command";

export function SidebarMenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

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
            onClick={() => setIsCommandOpen(true)}
            className="w-full hover:bg-sidebar-accent"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton 
            onClick={() => navigate("/")} 
            className="w-full hover:bg-sidebar-accent"
            data-active={location.pathname === "/"}
          >
            <Inbox className="h-4 w-4" />
            <span>Inbox</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => navigate("/archive")}
            className="w-full hover:bg-sidebar-accent"
            data-active={location.pathname === "/archive"}
          >
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <AddTodoDialog open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen} />
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Todos...</CommandItem>
              <CommandItem>Create Todo</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}