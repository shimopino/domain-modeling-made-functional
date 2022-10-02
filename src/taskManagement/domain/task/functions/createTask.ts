import { ok, Result } from 'neverthrow';
import { tuple } from '../../tuple';
import { generateTaskId } from '../vo/generateTaskId';
import { CreatedTask, ValidatedTask } from '../task.type';
import { TsakIdNonEmptyError } from '../vo/taskId';
import { TaskStatus } from '../vo/TaskStatus';

type ValidationErrors = TsakIdNonEmptyError;

type createTask = (
  model: ValidatedTask,
) => Result<CreatedTask, ValidationErrors>;

export const createTask: createTask = (model) => {
  const taskId = generateTaskId();
  const postphoneCount = ok(0);
  const status = ok(TaskStatus.TODO);

  const values = Result.combine(tuple(taskId, postphoneCount, status));

  return values.map(([taskId, postphoneCount, status]) => ({
    kind: 'CreatedTask',
    name: model.name,
    dueDate: model.dueDate,
    userId: model.userId,
    postphoneCount,
    taskId,
    status,
  }));
};
