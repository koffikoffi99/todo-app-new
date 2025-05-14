'use client';

import React from 'react';
import TodoForm from '@/components/TodoForm';
import { useRouter } from 'next/navigation';

const CreateTaskPage = () => {
  const router = useRouter();

  const handleTodoAdded = () => {
    // Pas besoin de passer newTodo ici, TodoForm s'occupe de l'ajout via localStorage
    router.push('/tasks'); // Redirige vers la liste des tâches après l'ajout
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer une Nouvelle Tâche
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veuillez remplir le formulaire ci-dessous pour ajouter une nouvelle tâche à votre liste.
          </p>
        </div>
        <TodoForm onTodoAdded={handleTodoAdded} />
        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Retour à la Liste des Tâches
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;