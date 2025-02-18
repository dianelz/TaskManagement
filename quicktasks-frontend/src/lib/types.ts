// ✅ Type des statuts autorisés
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

// ✅ Type des tâches
export type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  status: Status;
};