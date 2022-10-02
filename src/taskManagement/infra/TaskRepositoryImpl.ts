import { PrismaClient } from '@prisma/client';
import type { saveTaskFn } from '../domain/task/TaskRepository';

const client = new PrismaClient();

export const saveTask: saveTaskFn = async (model) => {
  await client.task.create({
    data: {
      id: model.taskId,
      dueDate: new Date(model.dueDate.toString()),
      name: model.name,
      postphoneCount: model.postphoneCount,
      status: '',
      userId: model.userId,
    },
  });
  return;
};
