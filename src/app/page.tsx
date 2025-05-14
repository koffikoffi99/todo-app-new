'use client';

import React, { useState, useEffect } from 'react';
import { loadTodos } from '@/gateways/localStorageGateway';
import TodoList from '@/components/TodoList';
//import { Button } from '@/components/ui/button'; // Assurez-vous que le chemin est correct
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Todo {
  id: string;
  title: string;
  text: string;
  completed: boolean;
  status: 'en cours' | 'terminée';
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initialTodos = loadTodos();
    setTodos(initialTodos);
  }, []);

    const handleTodoAdded = (newTodo: Todo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Ma Liste de Tâches
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
            Organisez votre productivité.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/create-tasks')}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2"
          >
            <PlusCircle className="w-6 h-6" />
            Ajouter une Tâche
          </button>
        </div>
        <TodoList todos={todos} onTodoAdded={handleTodoAdded} />
      </div>
    </div>
  );
};

export default HomePage;