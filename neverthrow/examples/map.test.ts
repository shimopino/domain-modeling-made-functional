import { err, ok } from 'neverthrow';
import { expect, test } from 'vitest';

const hello = (name: string) => {
  if (name.length === 0) return err({ type: 'NonEmptyError' as const });
  return ok(`hello ${name}`);
};

test('[成功ケース] map関数を使用して、 T=>U の関数を T=>Result<U,E> に変換する', () => {
  const result = hello('shimokawa');

  /**
   * newResultの型推論は下記になる
   * 各関数のResult型の型がマージされた形式になる
   *
   *   Result<{output: string;}, never>
   * | Result<{output: string;}, {type:"NonEmptyError";}>
   */
  const newResult = result.map((input: string) => ({ output: input }));

  expect(newResult.isOk()).toBe(true);
  expect(newResult.unwrapOr('never')).toEqual({ output: 'hello shimokawa' });
});

test('[失敗ケース] map関数を使用して、 T=>U の関数を T=>Result<U,E> に変換する', () => {
  const result = hello('');

  const newResult = result.map((input: string) => ({ output: input }));

  expect(newResult.isErr()).toBe(true);
  expect(newResult.unwrapOr('never')).toEqual('never');
  if (newResult.isErr()) {
    expect(newResult.error).toEqual({ type: 'NonEmptyError' });
  }
});

test('[失敗ケース] mapErr関数を使用して、 E => Result<T, F> というエラー変換を行う', () => {
  const result = hello('');

  const newResult = result
    .map((input: string) => ({ output: input }))
    .mapErr((error) => ({ type: 'WrapError', origin: error.type }));

  expect(newResult.isErr()).toBe(true);
  expect(newResult.unwrapOr('never')).toEqual('never');
  if (newResult.isErr()) {
    expect(newResult.error).toEqual({
      type: 'WrapError',
      origin: 'NonEmptyError',
    });
  }
});
