import { err, ok } from 'neverthrow';
import { expect, test } from 'vitest';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const throwAsyncRequest = async (name: string) => {
  if (name === '') {
    throw new Error('例外を送出させる');
  }
  await sleep(500);
  return `hello ${name}`;
};

test('例外を送出させる場合', async () => {
  await expect(throwAsyncRequest('')).rejects.toThrow(
    new Error('例外を送出させる'),
  );
});

const resultAsyncRequest = async (name: string) => {
  if (name === '') {
    return err(new Error('例外を返す'));
  }
  await sleep(500);
  return ok(`hello ${name}`);
};

test('[成功ケース] Rsult型で結果を返す', async () => {
  const result = await resultAsyncRequest('shimokawa');

  // それぞれの関数に結果の真偽値が格納される
  expect(result.isOk()).toBe(true);
  expect(result.isErr()).toBe(false);

  // @ts-expect-error 型を狭めていない状況では型エラーが発生する
  result.value;

  // それぞれの値には、Type Narrowingを行えばアクセスできる
  if (result.isOk()) {
    expect(result.value).toBe('hello shimokawa');
  }
});

test('[失敗ケース] Rsult型で結果を返す', async () => {
  const result = await resultAsyncRequest('');

  // それぞれの関数に結果の真偽値が格納される
  expect(result.isOk()).toBe(false);
  expect(result.isErr()).toBe(true);

  // @ts-expect-error 型を狭めていない状況では型エラーが発生する
  result.error;

  // それぞれの値には、Type Narrowingを行えばアクセスできる
  if (result.isErr()) {
    expect(result.error).toStrictEqual(new Error('例外を返す'));
  }
});
