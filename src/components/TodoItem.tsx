
'use client';

import React, { useState } from 'react';
import { Todo } from '../interfaces/todo';
import { useRouter } from 'next/navigation';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditClick = () => {
    router.push(`/update-tasks?id=${todo.id}`);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    router.push(`/delete-tasks?id=${todo.id}`); // <-- Vérifiez cette ligne
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <li className="bg-white shadow rounded-md p-4 mb-2 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
        <p className="text-gray-600 text-sm">{todo.text}</p>
        <p className="text-gray-500 text-xs">
          Statut:
          <span className={todo.status === 'terminée' ? 'text-green-500' : 'text-yellow-500'}>
            {todo.status}
          </span>
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={handleEditClick}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
        >
          Modifier
        </button>
        <button
          onClick={confirmDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
        >
          Supprimer
        </button>

        {showConfirm && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Confirmer la suppression
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Êtes-vous sûr de vouloir supprimer la tâche "{todo.title}" ?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={confirmDelete}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={cancelDelete}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;