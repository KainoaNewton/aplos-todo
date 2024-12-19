import { Settings } from "@/types/todo";

export interface SettingsSlice {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

export const createSettingsSlice = (set: any): SettingsSlice => ({
  settings: {
    theme: {
      mode: "light",
      color: "#8B5CF6",
    },
  },
  updateSettings: (settings) =>
    set(() => ({
      settings,
    })),
});