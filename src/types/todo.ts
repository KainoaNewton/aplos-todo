export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
};

export type View = {
  id: string;
  name: string;
  filter: {
    tags?: string[];
    dateRange?: {
      start?: Date;
      end?: Date;
    };
    completed?: boolean;
  };
};

export type ThemeColor = "blue" | "purple" | "green";
export type ThemeMode = "light" | "dark";

export type Settings = {
  theme: {
    mode: ThemeMode;
    color: ThemeColor;
  };
};