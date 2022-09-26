import { expect, test } from 'vitest';
import { pipeAsync } from './pipeAsync';
import { sleep } from './utils/sleep';

test('pipeAsync', async () => {
  const result = await pipeAsync(
    10,
    async (input: number) => {
      await sleep(100);
      return input + 10;
    },
    async (input: number) => {
      await sleep(100);
      return `count: ${input}`;
    },
    (input: string) => {
      console.log(input);
      return input + ' finished';
    },
    (input: string) => {
      return input + " (pipeAsync)"
    },
  );

  expect(result).toBe('count: 20 finished (pipeAsync)');
});
