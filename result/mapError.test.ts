import { expect, test } from 'vitest';
import { mapError } from './mapError';
import { err, ok } from './Result';

const EmptyStringError = {
  type: 'EmptyStringError',
} as const;
type EmptyStringError = typeof EmptyStringError;

const String20OverError = {
  type: 'String20OverError',
} as const;
type String20OverError = typeof String20OverError;

type ValidationError = EmptyStringError | String20OverError;

test('[成功ケース] mapError関数を使用して、エラー型を異なるエラー型に変換する', () => {
  const validationError = (input: ValidationError) => input as ValidationError;
  const mapErrorHello = mapError(validationError);

  const input = ok('shimokawa');
  const result = mapErrorHello(input);

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('shimokawa');
  }
});

test('[失敗ケース] mapError関数を使用して、エラー型を異なるエラー型に変換する', () => {
  const validationError = (input: ValidationError) => input as ValidationError;
  const mapErrorHello = mapError(validationError);

  const input = err(EmptyStringError);
  const result = mapErrorHello(input);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'EmptyStringError' });
  }
});
