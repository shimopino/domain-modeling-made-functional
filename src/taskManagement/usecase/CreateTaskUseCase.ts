import { ok } from 'neverthrow';
import { UnvalidatedTask } from '../domain/task/task.type';
import { validateTask } from '../domain/task/functions/validateTask';
import { createTask } from '../domain/task/functions/createTask';
import { saveCreatedTask } from '../infra/TaskRepositoryImpl';
import { PrismaClient } from '@prisma/client';

export const CreateTaskUseCase = async (model: UnvalidatedTask) => {
  const client = new PrismaClient();

  const result = await ok(model)
    .andThen(validateTask)
    .andThen(createTask)
    .asyncMap(saveCreatedTask(client));

  return result;
};
