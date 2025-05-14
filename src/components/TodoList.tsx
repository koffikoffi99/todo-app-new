'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '../interfaces/todo';
import TodoItem from './TodoItem';
import { loadTodos } from '../gateways/localStorageGateway';
import Link from 'next/link';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const initialTodos = loadTodos();
    setTodos(initialTodos);
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Liste des Tâches</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <Link href="/create-tasks" className="inline-block mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Ajouter une Nouvelle Tâche
      </Link>
    </div>
  );
};

export default TodoList;

