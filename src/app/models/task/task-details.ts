import { TaskComments } from "./task-comments";

export interface TaskDetails {
    id?: number;
    title: string;
    description?: string;
    userId?: number;
    priority?: 'High' | 'Medium' | 'Low';
    status?: 'To Do' | 'In Progress' | 'Done';
    dueDate: Date;
    comments?: TaskComments[];
}