import { err, ok, Result } from 'neverthrow';
import { expect, test } from 'vitest';

test('', () => {
  const sq = (n: number): Result<number, number> => ok(n ** 2);

  const result = ok(2).andThen(sq).andThen(sq); // Ok(16)

  expect(result.unwrapOr('never')).toBe(16);
});

// test('andThenを使用して発生しうるエラーをマージしたResult型を返す', () => {
//   const hello = (name: string) => {
//     if (name.length === 0) return err({ type: 'NonEmptyError' as const });
//     return ok(`hello ${name}`);
//   };

//   const goodBye = (name: string) => {
//     if (name.includes('no')) return err({ type: 'NonAcceptedError' as const });
//     return ok(`${name}, goodbye`);
//   };

//   const result = hello('shimokawa').andThen(goodBye);
// });
