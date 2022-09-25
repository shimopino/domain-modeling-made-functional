import { expect, test } from 'vitest';
import { pipe } from './pipe';

test('pipe', () => {
  const workflow = pipe(
    (initialValue: number) => initialValue + 10,
    (value: number) => String(value),
  );

  const result = workflow(0);

  expect(result).toBe('10');
});
