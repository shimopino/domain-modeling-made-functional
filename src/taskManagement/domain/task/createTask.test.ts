import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { UserId } from '../user/vo/userId';
import { createTask } from './createTask';
import { DueDate } from './vo/dueDate';
import { ValidatedTask } from './task.type';
import * as nanoid from 'nanoid';
import { DateTime } from 'luxon';

vi.mock('nanoid');

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const createDueDate = (dueDate: string) => DateTime.fromISO(dueDate);

const createValidatedTask = (
  args?: Partial<{ name: string; dueDate: string; userId: string }>,
): ValidatedTask => {
  const dueDate = DueDate(args?.dueDate ?? '2022-10-01T08:30:00');
  const userId = UserId(args?.userId ?? 'randomSeed');
  const name = args?.name ?? 'sample Task';

  return {
    kind: 'ValidatedTask',
    dueDate: dueDate._unsafeUnwrap(),
    name,
    userId: userId._unsafeUnwrap(),
  };
};

test('TaskをID付きで生成すると、延期回数は0回に設定されている', () => {
  const mockCurrent = createDueDate('2022-10-01T08:30:00');
  vi.setSystemTime(mockCurrent.toString());
  vi.mocked(nanoid).nanoid.mockReturnValueOnce('nanoid');

  const validatedTask = createValidatedTask();

  const result = createTask(validatedTask);

  expect(result.isOk()).toBe(true);
  expect(result._unsafeUnwrap()).toEqual({
    dueDate: validatedTask.dueDate,
    kind: 'CreatedTask',
    name: 'sample Task',
    postphoneCount: 0,
    taskId: 'nanoid',
    userId: 'randomSeed',
    status: 'TODO',
  });
});
