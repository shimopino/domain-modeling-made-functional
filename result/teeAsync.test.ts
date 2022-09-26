import { expect, test, vi } from 'vitest';
import { err, ok } from './Result';
import { teeAsync } from './teeAsync';
import { sleep } from './utils/sleep';

test('[成功ケース] 行き止まり関数を2トラック関数に変換する', async () => {
  const logger = vi.fn();
  const Asynclogger = async (input: unknown) => {
    await sleep(100);
    logger(input);
  };
  const logging = async (input: string) => {
    await Asynclogger(input);
  };

  const twoTrackFn = teeAsync(logging);
  const input = ok('input string');
  const result = await twoTrackFn(input);

  expect(result).toEqual(input);
  expect(logger).toBeCalledWith('input string');
});

test('[失敗ケース] 行き止まり関数を2トラック関数に変換する', async () => {
  const logger = vi.fn();
  const Asynclogger = async (input: unknown) => {
    await sleep(100);
    logger(input);
  };
  const logging = async (input: string) => {
    await Asynclogger(input);
  };

  const twoTrackFn = teeAsync(logging);
  const input = err({ type: 'error' });
  const result = await twoTrackFn(input);

  expect(result).toEqual(input);
  expect(logger).not.toBeCalled();
});
