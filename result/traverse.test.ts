import { test } from 'vitest';
import { err, ok, Result } from './Result';
import { traverse } from './traverse';

type NonEmptyStringError = {
  type: 'NonEmptyStringError';
};

type ExceedMaximumError = {
  type: 'ExceedMaximumError';
};

const parseInt = (
  str: string,
): Result<number, NonEmptyStringError | ExceedMaximumError> => {
  if (str.length === 0) return err({ type: 'NonEmptyStringError' });
  if (str.length > 6) return err({ type: 'ExceedMaximumError' });

  return ok(Number(str));
};

test('[成功ケース] 単一の値の関数を複数の入力に適用する', () => {
  const traverseParseInt = traverse(parseInt);
});
