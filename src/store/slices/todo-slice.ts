import { Todo } from "@/types/todo";

export interface TodoSlice {
  todos: Todo[];
  archivedTodos: Todo[];
  addTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: Todo) => void;
  archiveTodo: (id: string) => void;
}

export const createTodoSlice = (set: any): TodoSlice => ({
  todos: [],
  archivedTodos: [],
  addTodo: (todo) =>
    set((state: TodoSlice) => ({
      todos: [
        ...state.todos,
        { ...todo, id: crypto.randomUUID(), createdAt: new Date() },
      ],
    })),
  toggleTodo: (id) =>
    set((state: TodoSlice) => {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        const updatedTodos = state.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        
        if (!todo.completed) {
          setTimeout(() => {
            set((state: TodoSlice) => ({
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
    set((state: TodoSlice) => ({
      todos: state.todos.map((t) => (t.id === id ? todo : t)),
    })),
  deleteTodo: (id) =>
    set((state: TodoSlice) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  archiveTodo: (id) =>
    set((state: TodoSlice) => {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        return {
          todos: state.todos.filter((t) => t.id !== id),
          archivedTodos: [...state.archivedTodos, todo],
        };
      }
      return state;
    }),
});