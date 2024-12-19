import { Plus, Search, Inbox, Archive, Settings, Eye, ChartNoAxesGantt, Tag } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AddTodoDialog } from "../dialogs/add-todo-dialog";
import { AddViewDialog } from "../dialogs/add-view-dialog";
import { AddTagDialog } from "../dialogs/add-tag-dialog";
import { SettingsDialog } from "../dialogs/settings-dialog";
import { useTodoStore } from "@/store/todo-store";
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
  const [isAddViewOpen, setIsAddViewOpen] = useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { views, tags } = useTodoStore();

  const handleCommand = (command: string) => {
    switch (command) {
      case "create-todo":
        setIsAddTodoOpen(true);
        break;
      case "inbox":
        navigate("/");
        break;
      case "archive":
        navigate("/archive");
        break;
      case "create-view":
        setIsAddViewOpen(true);
        break;
      case "create-tag":
        setIsAddTagOpen(true);
        break;
      case "settings":
        setIsSettingsOpen(true);
        break;
    }
    setIsCommandOpen(false);
  };

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
            className="w-full hover:bg-accent"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton 
            onClick={() => navigate("/")} 
            className="w-full hover:bg-accent"
            data-active={location.pathname === "/"}
          >
            <Inbox className="h-4 w-4" />
            <span>Inbox</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => navigate("/archive")}
            className="w-full hover:bg-accent"
            data-active={location.pathname === "/archive"}
          >
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <div className="mt-4">
        <div className="px-3 text-xs font-semibold text-muted-foreground">Navigation</div>
        <SidebarMenu>
          {views.map((view) => (
            <SidebarMenuItem key={view.id}>
              <SidebarMenuButton
                onClick={() => navigate(`/view/${view.id}`)}
                className="w-full hover:bg-accent"
                data-active={location.pathname === `/view/${view.id}`}
              >
                <ChartNoAxesGantt className="h-4 w-4" />
                <span>{view.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {tags.map((tag) => (
            <SidebarMenuItem key={tag.id}>
              <SidebarMenuButton
                onClick={() => navigate(`/tag/${tag.id}`)}
                className="w-full hover:bg-accent"
                data-active={location.pathname === `/tag/${tag.id}`}
              >
                <Tag className="h-4 w-4" />
                <span className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.name}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>

      <AddTodoDialog open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen} />
      <AddViewDialog open={isAddViewOpen} onOpenChange={setIsAddViewOpen} />
      <AddTagDialog open={isAddTagOpen} onOpenChange={setIsAddTagOpen} />
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => handleCommand("create-todo")}>
                <Plus className="mr-2 h-4 w-4" />
                Create Todo
              </CommandItem>
              <CommandItem onSelect={() => handleCommand("create-view")}>
                <ChartNoAxesGantt className="mr-2 h-4 w-4" />
                Create View
              </CommandItem>
              <CommandItem onSelect={() => handleCommand("create-tag")}>
                <Plus className="mr-2 h-4 w-4" />
                Create Tag
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => handleCommand("inbox")}>
                <Inbox className="mr-2 h-4 w-4" />
                Inbox
              </CommandItem>
              <CommandItem onSelect={() => handleCommand("archive")}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </CommandItem>
              <CommandItem onSelect={() => handleCommand("views")}>
                <ChartNoAxesGantt className="mr-2 h-4 w-4" />
                Views
              </CommandItem>
              <CommandItem onSelect={() => handleCommand("tags")}>
                <Eye className="mr-2 h-4 w-4" />
                Tags
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => handleCommand("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Open Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}