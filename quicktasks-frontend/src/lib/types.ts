//export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';


export type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  status: TaskStatus;
  statusId: number;
};

export type TaskStatus ={
  id: number;
  name : string;
  is_closed: boolean;
  is_new : boolean;
  sequence : number;
  isEditing?: boolean;
}
