import { UserId } from '../user/vo/userId';
import { DueDate } from './vo/dueDate';
import { TaskId } from './vo/taskId';
import { TaskStatus } from './vo/TaskStatus';

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
  status: TaskStatus;
  postphoneCount: number;
};
