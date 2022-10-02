import { expect, test } from 'vitest';
import { DueDate } from './dueDate';

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
