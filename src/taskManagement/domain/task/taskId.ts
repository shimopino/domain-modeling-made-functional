import { err, ok, Result } from 'neverthrow';
import { Branded } from '../branded';

export type TaskId = Branded<string, 'TaskId'>;

export type TsakIdNonEmptyError = {
  type: 'TsakIdNonEmptyError';
  id: string;
};

export const TaskId = (taskId: string): Result<TaskId, TsakIdNonEmptyError> => {
  if (taskId.length === 0) {
    return err({
      type: 'TsakIdNonEmptyError',
      id: taskId,
    });
  }

  return ok(taskId as TaskId);
};
