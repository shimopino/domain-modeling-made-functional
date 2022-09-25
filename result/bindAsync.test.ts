import { expect, test } from 'vitest';
import { bindAsync } from './bindAsync';
import { err, ok, Result } from './Result';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const EmptyStringError = {
  type: 'EmptyStringError',
} as const;
type EmptyStringError = typeof EmptyStringError;

const hello = async (
  name: string,
): Promise<Result<string, EmptyStringError>> => {
  await sleep(500);

  if (name === '') {
    return err(EmptyStringError);
  }

  return ok(`hello ${name}`);
};

test('元の関数の挙動確認', async () => {
  const input = 'shimokawa';
  const result = await hello(input);

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('hello shimokawa');
  }
});

test('[成功ケース] bindAsyncで非同期な1-way関数を2-way関数に変換する', async () => {
  const twoTrackAsyncHello = bindAsync(hello);

  const input = ok('shimokawa');
  const result = await twoTrackAsyncHello(input);

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('hello shimokawa');
  }
});

test('[失敗ケース] bindAsyncで非同期な1-way関数を2-way関数に変換する', async () => {
  const twoTrackAsyncHello = bindAsync(hello);

  const input = err(EmptyStringError);
  const result = await twoTrackAsyncHello(input);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'EmptyStringError' });
  }
});
