import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tag, Todo, View, Settings } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  archivedTodos: Todo[];
  tags: Tag[];
  views: View[];
  settings: Settings;
  addTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: Todo) => void;
  archiveTodo: (id: string) => void;
  addTag: (tag: Omit<Tag, "id">) => void;
  deleteTag: (id: string) => void;
  addView: (view: View) => void;
  deleteView: (id: string) => void;
  updateSettings: (settings: Settings) => void;
  updateTag: (id: string, tag: Tag) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      archivedTodos: [],
      tags: [],
      views: [],
      settings: {
        theme: {
          mode: "light",
          color: "#8B5CF6",
        },
      },
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { ...todo, id: crypto.randomUUID(), createdAt: new Date() },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) {
            // Mark as completed
            const updatedTodos = state.todos.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            );
            
            // If the todo is now completed, set a timeout to archive it
            if (!todo.completed) {
              setTimeout(() => {
                set((state) => ({
                  todos: state.todos.filter((t) => t.id !== id),
                  archivedTodos: [...state.archivedTodos, { ...todo, completed: true }],
                }));
              }, 1000);
            }
            
            return { todos: updatedTodos };
          }
          return state;
        }),
      updateTodo: (id, todo) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? todo : t)),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      archiveTodo: (id) =>
        set((state) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) {
            return {
              todos: state.todos.filter((t) => t.id !== id),
              archivedTodos: [...state.archivedTodos, todo],
            };
          }
          return state;
        }),
      addTag: (tag) =>
        set((state) => ({
          tags: [...state.tags, { ...tag, id: crypto.randomUUID() }],
        })),
      deleteTag: (id) =>
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          todos: state.todos.map((todo) => ({
            ...todo,
            tags: todo.tags.filter((tagId) => tagId !== id),
          })),
        })),
      addView: (view) =>
        set((state) => {
          const existingViewIndex = state.views.findIndex((v) => v.id === view.id);
          if (existingViewIndex !== -1) {
            // Update existing view
            const updatedViews = [...state.views];
            updatedViews[existingViewIndex] = view;
            return { views: updatedViews };
          } else {
            // Add new view
            return { views: [...state.views, view] };
          }
        }),
      deleteView: (id) =>
        set((state) => ({
          views: state.views.filter((view) => view.id !== id),
        })),
      updateSettings: (settings) =>
        set(() => ({
          settings,
        })),
      updateTag: (id, updatedTag) =>
        set((state) => ({
          tags: state.tags.map((tag) => (tag.id === id ? updatedTag : tag)),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);