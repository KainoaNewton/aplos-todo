import { View } from "@/types/todo";

export interface ViewSlice {
  views: View[];
  addView: (view: View) => void;
  deleteView: (id: string) => void;
}

export const createViewSlice = (set: any): ViewSlice => ({
  views: [],
  addView: (view) =>
    set((state: ViewSlice) => ({
      views: state.views.map((v) => (v.id === view.id ? view : v)).length > 0
        ? state.views.map((v) => (v.id === view.id ? view : v))
        : [...state.views, { ...view, id: crypto.randomUUID() }],
    })),
  deleteView: (id) =>
    set((state: ViewSlice) => ({
      views: state.views.filter((view) => view.id !== id),
    })),
});