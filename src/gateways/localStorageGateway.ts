import { Todo } from "@/interfaces/todo";

const STORAGE_KEY = 'todos';

export const loadTodos = (): Todo[] => {
  try {
    const serializedTodos = localStorage.getItem(STORAGE_KEY);
    return serializedTodos ? JSON.parse(serializedTodos) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des todos depuis le localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  try {
    const serializedTodos = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, serializedTodos);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des todos dans le localStorage:', error);
  }
};

export const addTodo = (title: string, text: string, status: 'en cours' | 'terminée'): Todo => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    text,
    completed: false,
    status,
  };
  const todos = loadTodos();
  saveTodos([...todos, newTodo]);
  return newTodo;
};

export const updateTodo = (updatedTodo: Todo): void => {
  const todos = loadTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  saveTodos(updatedTodos);
};

export const deleteTodo = (id: string): void => {
  const todos = loadTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(updatedTodos);
};