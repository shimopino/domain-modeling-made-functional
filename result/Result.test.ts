import { expect, test } from 'vitest';
import { err, ok, Result } from './Result';

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
