import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tag, Todo, View, Settings } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  tags: Tag[];
  views: View[];
  settings: Settings;
  addTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addTag: (tag: Omit<Tag, "id">) => void;
  deleteTag: (id: string) => void;
  addView: (view: Omit<View, "id">) => void;
  deleteView: (id: string) => void;
  updateSettings: (settings: Settings) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      tags: [],
      views: [],
      settings: {
        theme: {
          mode: "light",
          color: "blue",
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
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      addTag: (tag) =>
        set((state) => ({
          tags: [...state.tags, { ...tag, id: crypto.randomUUID() }],
        })),
      deleteTag: (id) =>
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
        })),
      addView: (view) =>
        set((state) => ({
          views: [...state.views, { ...view, id: crypto.randomUUID() }],
        })),
      deleteView: (id) =>
        set((state) => ({
          views: state.views.filter((view) => view.id !== id),
        })),
      updateSettings: (settings) =>
        set(() => ({
          settings,
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);