import { DateTime } from 'luxon';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { DueDate } from './dueDate';

const expectedDueDate = (dueDate: string) => DateTime.fromISO(dueDate);

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('[失敗ケース] フォーマットがISO形式ではない場合にエラーになる', () => {
  // const input = "2017-05-15T08:30:00"
  const input = '2017.05.15T08:30:00';

  const result = DueDate(input);

  expect(result.isErr()).toBe(true);
  expect(result._unsafeUnwrapErr()).toEqual({
    type: 'NotISOFormatError',
    from: '2017.05.15T08:30:00',
  });
});

test('[失敗ケース] 過去の日付を指定した場合にエラーになる', () => {
  const mockCurrent = new Date(2022, 10, 3, 12, 0, 0);
  vi.setSystemTime(mockCurrent);

  const input = '2022-10-01T08:30:00';

  const result = DueDate(input);

  expect(result.isErr()).toBe(true);
  expect(result._unsafeUnwrapErr()).toEqual({
    type: 'PastTimeSetError',
    from: expectedDueDate('2022-10-01T08:30:00.000+00:00'),
  });
});

test('[失敗ケース] 1週間よりも先を指定した場合にエラーになる', () => {
  const mockCurrent = DateTime.fromISO('2022-09-01T08:30:00');
  vi.setSystemTime(mockCurrent.toString());

  // const input = "2022-09-01T08:30:00";
  const input = '2022-09-08T08:30:01';

  const result = DueDate(input);

  expect(result.isErr()).toBe(true);
  expect(result._unsafeUnwrapErr()).toEqual({
    type: 'ExceedMaximumDueDateError',
    from: expectedDueDate('2022-09-08T08:30:01.000+00:00'),
  });
});

test('[成功ケース] ちょうど1週間先を指定した場合は成功する', () => {
  const mockCurrent = DateTime.fromISO('2022-09-01T08:30:00');
  vi.setSystemTime(mockCurrent.toString());

  // const input = "2022-09-01T08:30:00";
  const input = '2022-09-08T08:30:00';

  const result = DueDate(input);

  expect(result.isOk()).toBe(true);
  expect(result._unsafeUnwrap()).toEqual(
    expectedDueDate('2022-09-08T08:30:00.000+00:00'),
  );
});
