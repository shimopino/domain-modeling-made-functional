import { expect, test, vi } from 'vitest';
import { err, ok } from './Result';
import { tee } from './tee';

test('[成功ケース] 行き止まり関数を2トラック関数に変換する', () => {
  const logger = vi.fn();
  const logging = (input: string) => {
    logger(input);
  };

  const twoTrackFn = tee(logging);
  const input = ok('input string');
  const result = twoTrackFn(input);

  expect(result).toEqual(input);
  expect(logger).toBeCalledWith('input string');
});

test('[失敗ケース] 行き止まり関数を2トラック関数に変換する', () => {
  const logger = vi.fn();
  const logging = (input: string) => {
    logger(input);
  };

  const twoTrackFn = tee(logging);
  const input = err({ type: 'error' });
  const result = twoTrackFn(input);

  expect(result).toEqual(input);
  expect(logger).not.toBeCalled();
});
