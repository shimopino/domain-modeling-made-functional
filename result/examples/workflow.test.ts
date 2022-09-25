import { expect, test } from 'vitest';
import { err, ok, Result } from '../Result';
import { pipeWith } from '../pipeWith';
// import { mapError } from '../mapError';
import { bind } from '../bind';

type NonNegativeError = { type: 'NonNegativeError' };
type Over20Error = { type: 'Over20Error' };
// type ValidationError = NonNegativeError | Over20Error;

// const toValidationError = (input: unknown) => input as ValidationError;

const add10 = (input: number): Result<number, NonNegativeError> => {
  if (input < 0) {
    return err({ type: 'NonNegativeError' });
  }

  return ok(input + 10);
};

const numberToString = (input: number): Result<string, Over20Error> => {
  if (input > 20) {
    return err({ type: 'Over20Error' });
  }

  return ok(String(input));
};

test('関数を結合させていく', () => {
  const result = pipeWith(
    10,
    add10,
    // mapError(toValidationError),
    bind(numberToString),
  );

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('20');
  }
});

test('[NonNegativeError] 関数を結合させていく', () => {
  const result = pipeWith(
    -10,
    add10,
    // mapError(toValidationError),
    bind(numberToString),
  );

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'NonNegativeError' });
  }
});

test('[Over20Error] 関数を結合させていく', () => {
  const result = pipeWith(
    20,
    add10,
    // mapError(toValidationError),
    bind(numberToString),
  );

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'Over20Error' });
  }
});
