import { expect, test } from 'vitest';
import { mapAsync } from './mapAsync';
import { err, ok } from './Result';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const convert = async (input: number) => {
  await sleep(500);

  return String(input);
};

test('元の関数', async () => {
  const input = 100;
  const result = await convert(input);

  expect(result).toBe('100');
});

test('[成功ケース] map関数を使用して、Result型を返す関数に変換する', async () => {
  const mapConvert = mapAsync(convert);

  const input = ok(100);
  const result = await mapConvert(input);

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('100');
  }
});

test('[失敗ケース] map関数を使用して、Result型を返す関数に変換する', async () => {
  const mapConvert = mapAsync(convert);

  const input = err({ type: 'SampleError' });
  const result = await mapConvert(input);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'SampleError' });
  }
});
