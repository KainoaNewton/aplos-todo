import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTodoSlice, TodoSlice } from "./slices/todo-slice";
import { createTagSlice, TagSlice } from "./slices/tag-slice";
import { createViewSlice, ViewSlice } from "./slices/view-slice";
import { createSettingsSlice, SettingsSlice } from "./slices/settings-slice";

type StoreState = TodoSlice & TagSlice & ViewSlice & SettingsSlice;

export const useTodoStore = create<StoreState>()(
  persist(
    (set) => ({
      ...createTodoSlice(set),
      ...createTagSlice(set),
      ...createViewSlice(set),
      ...createSettingsSlice(set),
    }),
    {
      name: "todo-storage",
    }
  )
);