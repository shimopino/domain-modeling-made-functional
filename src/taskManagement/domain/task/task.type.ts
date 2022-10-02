import { UserId } from '../user/userId';
import { DueDate } from './dueDate';
import { TaskId } from './taskId';

export type UnvalidatedTask = {
  kind: 'UnvalidatedTask';
  userId: string;
  name: string;
  dueDate: string;
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
