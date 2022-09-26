import { expect, test } from 'vitest';
import { err, ok, Result } from '../Result';
import { pipeWith } from '../pipeWith';
// import { mapError } from '../mapError';
import { bind } from '../bind';

type NonNegativeError = { type: 'NonNegativeError' };
type Over20Error = { type: 'Over20Error' };
type Contain20Error = { type: 'Contain20Error' };
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

const helloString = (input: string): Result<string, Contain20Error> => {
  if (input.includes('20')) {
    return err({ type: 'Contain20Error' });
  }

  return ok(`hello ${input}`);
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

test('連結を深くしていく', () => {
  const result = pipeWith(5, add10, bind(numberToString), bind(helloString));

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('hello 15');
  }
});

test('連結を深くしていく', () => {
  const result = pipeWith(10, add10, bind(numberToString), bind(helloString));

  expect(result.ok).toBe(false);
  if (!result.ok) {
    const errorType = result.error.type;
    switch (errorType) {
      case 'NonNegativeError':
        errorType;
        return;
      case 'Over20Error':
        errorType;
        return;
      case 'Contain20Error':
        errorType;
        return;
      default: {
        const _: never = errorType;
        return;
      }
    }
  }
});
