import { ok, Result } from 'neverthrow';
import { tuple } from '../tuple';
import { generateTaskId } from './generateTaskId';
import { CreatedTask, ValidatedTask } from './task.type';
import { TsakIdNonEmptyError } from './taskId';

type ValidationErrors = TsakIdNonEmptyError;

type createTask = (
  model: ValidatedTask,
) => Result<CreatedTask, ValidationErrors>;

export const createTask: createTask = (model) => {
  const taskId = generateTaskId();
  const postphoneCount = ok(0);

  const values = Result.combine(tuple(taskId, postphoneCount));

  return values.map(([taskId, postphoneCount]) => ({
    kind: 'CreatedTask',
    name: model.name,
    dueDate: model.dueDate,
    userId: model.userId,
    postphoneCount,
    taskId,
  }));
};
