import { expect, test } from 'vitest';
import { mapErrorAsync } from './mapErrorAsync';
import { err, ok } from './Result';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const EmptyStringError = {
  type: 'EmptyStringError',
} as const;
type EmptyStringError = typeof EmptyStringError;

const String20OverError = {
  type: 'String20OverError',
} as const;
type String20OverError = typeof String20OverError;

type ValidationError = EmptyStringError | String20OverError;

const validationError = async (input: ValidationError) => {
  await sleep(500)
  return input as ValidationError;
}

test('[成功ケース] mapError関数を使用して、エラー型を異なるエラー型に変換する', async () => {

  const mapErrorHello = mapErrorAsync(validationError);

  const input = ok('shimokawa');
  const result = await mapErrorHello(input);

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('shimokawa');
  }
});

test('[失敗ケース] mapError関数を使用して、エラー型を異なるエラー型に変換する', async () => {
  const mapErrorHello = mapErrorAsync(validationError);

  const input = err(EmptyStringError);
  const result = await mapErrorHello(input);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'EmptyStringError' });
  }
});
