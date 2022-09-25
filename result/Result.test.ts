import { expect, test } from 'vitest';
import { bind, err, mapError, ok, Result } from './Result';
import { pipe } from './pipe';

class NameEmptyError extends Error {}

const resultHello = (name: string): Result<string, NameEmptyError> => {
  if (name === '') return err(new NameEmptyError());

  return ok(`hello ${name}`);
};

test('ok関数', () => {
  const result = resultHello('shimokawa');

  expect(result.ok).toBe(true);

  if (result.ok) {
    expect(result.value).toBe('hello shimokawa');
  }
});

test('err関数', () => {
  const result = resultHello('');

  expect(result.ok).toBe(false);

  if (!result.ok) {
    expect(result.error).toStrictEqual(new NameEmptyError());
  }
});

test('[成功ケース] bind関数で1ウェイ関数を2ウェイ関数に変換する', () => {
  const twoTrack = bind(resultHello);

  const okResult = ok(`shimokawa`);
  const result = twoTrack(okResult);

  expect(result.ok).toBe(true);
  if (result.ok) expect(result.value).toBe('hello shimokawa');
});

test('[失敗ケース] bind関数で1ウェイ関数を2ウェイ関数に変換する', () => {
  const twoTrack = bind(resultHello);

  const errResult = err(new NameEmptyError());
  const result = twoTrack(errResult);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toStrictEqual(new NameEmptyError());
  }
});

class NotNegativeValueError extends Error {}
class Over100Error extends Error {}
type ValidationError = NotNegativeValueError | Over100Error;

const add10 = (value: number): Result<number, NotNegativeValueError> => {
  if (value < 0) {
    return err(new NotNegativeValueError());
  }
  return ok(value + 10);
};

const tellNumber = (value: number): Result<string, Over100Error> => {
  if (value > 100) {
    return err(new Over100Error());
  }

  return ok(`hello ${value}`);
};

test('mapErrorで共通のエラー型に変換する', () => {
    mapError()
});
