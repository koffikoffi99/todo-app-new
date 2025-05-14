'use client';

import TodoList from '@/components/TodoList';
import React from 'react';
import { useRouter } from 'next/navigation';

const TasksPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="mb-6">
        <button
          onClick={() => router.push('/')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Accueil
        </button>
      </div>
      <TodoList />
    </div>
  );
};

export default TasksPage;
