
'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '../interfaces/todo';
import { loadTodos, updateTodo, deleteTodo } from '../gateways/localStorageGateway';

interface TodoTableProps {
  onTodoUpdated: (updatedTodo: Todo) => void;
  onTodoDeleted: (id: string) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ onTodoUpdated, onTodoDeleted }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const initialTodos = loadTodos();
    setTodos(initialTodos);
  }, []);

  const handleCheckboxChange = (id: string, completed: boolean) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    saveTodosToLocalStorage(updatedTodos);
    const updatedTodo = updatedTodos.find(todo => todo.id === id);
    if (updatedTodo) {
      onTodoUpdated(updatedTodo);
      setTodos(updatedTodos);
    }
  };

  const handleDeleteClick = (id: string) => {
    deleteTodo(id);
    onTodoDeleted(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const saveTodosToLocalStorage = (todosToSave: Todo[]) => {
    try {
      const serializedTodos = JSON.stringify(todosToSave);
      localStorage.setItem('todos', serializedTodos);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des todos dans le localStorage:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Complété</th>
          <th>Tâche</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => handleCheckboxChange(todo.id, e.target.checked)}
              />
            </td>
            <td>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            </td>
            <td>
              <button onClick={() => handleDeleteClick(todo.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;