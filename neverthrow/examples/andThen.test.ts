import { err, ok, Result } from 'neverthrow';
import { expect, test } from 'vitest';

test('', () => {
  const sq = (n: number): Result<number, number> => ok(n ** 2);

  const result = ok(2).andThen(sq).andThen(sq); // Ok(16)

  expect(result.unwrapOr('never')).toBe(16);
});

test('andThenを使用して発生しうるエラーをマージしたResult型を返す', () => {
  const hello = (name: string) => {
    if (name.length === 0) return err('NonEmptyError');
    return ok(`hello ${name}`);
  };

  const goodBye = (name: string) => {
    if (name.includes('no')) return err('NonAcceptedError');
    return ok(`${name}, goodbye`);
  };

  const result = hello('shimokawa');

  if (result.isOk()) {
    result.andThen(goodBye);
  }
});

test('型エラーが発生するバグあり', () => {
  const result = Math.random() ? err('wat') : ok(42);

  // @ts-expect-error ここで型エラーが発生する
  result.andThen(() => ok({}));
});

test('型エラーが発生しない', () => {
  const result: Result<number, string> = Math.random() ? err('wat') : ok(42);

  result.andThen(() => ok({}));
});
