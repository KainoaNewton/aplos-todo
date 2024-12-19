import { Tag } from "@/types/todo";

export interface TagSlice {
  tags: Tag[];
  addTag: (tag: Omit<Tag, "id">) => void;
  deleteTag: (id: string) => void;
  updateTag: (id: string, tag: Tag) => void;
}

export const createTagSlice = (set: any): TagSlice => ({
  tags: [],
  addTag: (tag) =>
    set((state: TagSlice) => ({
      tags: [...state.tags, { ...tag, id: crypto.randomUUID() }],
    })),
  deleteTag: (id) =>
    set((state: TagSlice & { todos: any[] }) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
      todos: state.todos.map((todo) => ({
        ...todo,
        tags: todo.tags.filter((tagId) => tagId !== id),
      })),
    })),
  updateTag: (id, updatedTag) =>
    set((state: TagSlice) => ({
      tags: state.tags.map((tag) => (tag.id === id ? updatedTag : tag)),
    })),
});