import { PrismaClient } from '@prisma/client';
import type { saveTaskFn } from '../domain/task/TaskRepository';

export const saveCreatedTask =
  (client: PrismaClient): saveTaskFn =>
  async (model) => {
    await client.task.create({
      data: {
        id: model.taskId,
        dueDate: new Date(model.dueDate.toString()),
        name: model.name,
        postphoneCount: model.postphoneCount,
        status: model.status,
        userId: model.userId,
      },
    });
    return model;
  };
