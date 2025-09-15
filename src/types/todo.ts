export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  tags: string[];
  createdAt: Date;
}

export interface View {
  id: string;
  name: string;
  filter: {
    tags?: string[];
  };
}

export type ThemeMode = "light" | "dark" | "system";

export interface Settings {
  theme: {
    mode: ThemeMode;
    color: string;
  };
}
