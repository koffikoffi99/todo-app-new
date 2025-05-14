'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTodo } from '../gateways/localStorageGateway';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'en cours' | 'terminée'>('en cours');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() && text.trim()) {
      addTodo(title, text, status);
      router.push('/tasks');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Titre:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la tâche"
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
          placeholder="Description de la tâche"
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
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter la Tâche
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default TodoForm;