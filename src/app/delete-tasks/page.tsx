'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteTodo } from '@/gateways/localStorageGateway';

const DeleteTaskPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idToDelete = searchParams.get('id');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (idToDelete) {
      try {
        deleteTodo(idToDelete);
        setConfirmed(true);
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert('Erreur lors de la suppression de la tâche.');
      }
    }
  };

  const handleCancel = () => {
    router.push('/tasks');
  };

  if (!idToDelete) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">ID de la tâche introuvable.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center max-w-md w-full">
        {!confirmed ? (
          <>
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Confirmation</h1>
            <p className="text-gray-700 mb-6">
              Voulez-vous vraiment supprimer cette tâche ? Cette action est irréversible.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Oui, supprimer
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Annuler
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-green-600 mb-4">
              Tâche supprimée avec succès !
            </h1>
            <button
              onClick={() => router.push('/tasks')}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Retour à la liste
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteTaskPage;
