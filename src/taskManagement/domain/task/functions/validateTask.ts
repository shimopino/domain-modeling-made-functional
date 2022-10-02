import { ok, Result } from 'neverthrow';
import { tuple } from '../../tuple';
import { UserId, UserIdNonEmptyError } from '../../user/vo/userId';
import {
  DueDate,
  NotISOFormatError,
  PastTimeSetError,
  ExceedMaximumDueDateError,
} from '../vo/dueDate';
import { UnvalidatedTask, ValidatedTask } from '../task.type';

type ValidationErrors =
  | UserIdNonEmptyError
  | NotISOFormatError
  | PastTimeSetError
  | ExceedMaximumDueDateError;

type validateTask = (
  model: UnvalidatedTask,
) => Result<ValidatedTask, ValidationErrors>;

export const validateTask: validateTask = (model) => {
  const userId = UserId(model.userId);
  const name = ok(model.name);
  const dueDate = DueDate(model.dueDate);

  const values = Result.combine(tuple(userId, name, dueDate));

  return values.map(([userId, name, dueDate]) => ({
    kind: 'ValidatedTask',
    userId,
    name,
    dueDate,
  }));
};
