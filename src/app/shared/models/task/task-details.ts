import { TaskComments } from './task-comments';

export interface TaskDetails {
  id: number;
  title: string;
  description?: string;
  userId?: string;
  priority?: 'High' | 'Medium' | 'Low';
  status?: 'ToDo' | 'InProgress' | 'Done';
  dueDate: Date;
  comments?: TaskComments[];
}

export type CreateTaskDetails = {
  title: string;
  description?: string;
  userId?: string;
  priority?: 'High' | 'Medium' | 'Low';
  status?: 'ToDo' | 'InProgress' | 'Done';
  dueDate: Date;
};
