import { expect, test, vi } from 'vitest';
import { generateTaskId } from './generateTaskId';
import * as nanoid from 'nanoid';

vi.mock('nanoid');

test('seedを指定した時にその値で初期化する', () => {
  const inputSeed = 'randomSeed';

  const taskId = generateTaskId(inputSeed);

  expect(taskId.isOk()).toBe(true);
  expect(taskId._unsafeUnwrap()).toBe('randomSeed');
});

test('seedを指定しなかった場合はnanoidで採番する', () => {
  vi.mocked(nanoid).nanoid.mockReturnValueOnce('nanoid');

  const taskId = generateTaskId();

  expect(taskId.isOk()).toBe(true);
  expect(taskId._unsafeUnwrap()).toBe('nanoid');
});
