import { expect, test } from 'vitest';
import { err, ok, Result } from './Result';

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
