export interface Todo {
    id: string;
    title: string;
    text: string;
    completed: boolean;
    status: 'en cours' | 'terminée';
  }