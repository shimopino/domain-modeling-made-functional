import { UserId } from '../user/userId';
import { TaskId } from './taskId';

export type UnvalidatedTask = {
  kind: 'UnvalidatedTask';
  userId: string;
  name: string;
  dueDate: Date;
};

export type ValidatedTask = {
  kind: 'ValidatedTask';
  userId: UserId;
  name: string;
  dueDate: DueDate;
};

export type CreatedTask = {
  kind: 'CreatedTask';
  taskId: TaskId;
  userId: UserId;
  name: string;
  dueDate: DueDate;
  postphoneCount: number;
};
