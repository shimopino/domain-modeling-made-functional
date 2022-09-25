import { expect, test } from 'vitest';
import { pipeWith } from './pipeWith';

test('pipe', () => {
  const result = pipeWith(
    0,
    (initialValue: number) => initialValue + 10,
    (value: number) => String(value),
  );

  expect(result).toBe('10');
});
