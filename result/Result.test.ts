import { expect, it, test } from 'vitest';
import { err, isErr, isOk, ok, Result } from './Result';

it('ok', () => {
  const okResult = ok('ok');

  expect(okResult.ok).toBe(true);
  expect(okResult.value).toBe('ok');
});

it('isOk', () => {
  const okResult = ok('ok');
  const isOkResult = isOk(okResult);

  expect(isOkResult).toBe(true);
});

it('err', () => {
  const errResult = err('err');

  expect(errResult.ok).toBe(false);
  expect(errResult.error).toBe('err');
});

it('isOk', () => {
  const errResult = err('err');
  const isErrResult = isErr(errResult);

  expect(isErrResult).toBe(true);
});

const NameEmptyError = {
  type: 'NameEmptyError',
} as const;
type NameEmptyError = typeof NameEmptyError;

const resultHello = (name: string): Result<string, typeof NameEmptyError> => {
  if (name === '') return err(NameEmptyError);

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
    expect(result.error).toStrictEqual(NameEmptyError);
  }
});
