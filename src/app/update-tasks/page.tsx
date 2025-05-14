'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadTodos, updateTodo } from '@/gateways/localStorageGateway';
import { Todo } from '@/interfaces/todo';

const UpdateTaskPage = () => {
  const [todoToUpdate, setTodoToUpdate] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'en cours' | 'terminée'>('en cours');
  const router = useRouter();
  const searchParams = useSearchParams();
  const idToUpdate = searchParams.get('id');

  useEffect(() => {
    if (idToUpdate) {
      const todos = loadTodos();
      const foundTodo = todos.find((todo) => todo.id === idToUpdate);
      if (foundTodo) {
        setTodoToUpdate(foundTodo);
        setTitle(foundTodo.title);
        setText(foundTodo.text);
        setStatus(foundTodo.status);
      } else {
        router.push('/tasks');
      }
    } else {
      router.push('/tasks');
    }
  }, [idToUpdate, router]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (todoToUpdate) {
      const updatedTodo: Todo = {
        ...todoToUpdate,
        title,
        text,
        status,
      };
      updateTodo(updatedTodo);
      router.push('/tasks');
    }
  };

  if (!todoToUpdate) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement des informations de la tâche...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Modifier la Tâche</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Titre:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
              Statut:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'en cours' | 'terminée')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enregistrer les Modifications
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Accueil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskPage;
