import { expect, test } from 'vitest';
import { map } from './map';
import { err, ok } from './Result';

const convert = (input: number) => String(input);

test('元の関数', () => {
  const input = 100;
  const result = convert(input);

  expect(result).toBe('100');
});

test('[成功ケース] map関数を使用して、Result型を返す関数に変換する', () => {
  const mapConvert = map(convert);

  const input = ok(100);
  const result = mapConvert(input);

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('100');
  }
});

test('[失敗ケース] map関数を使用して、Result型を返す関数に変換する', () => {
  const mapConvert = map(convert);

  const input = err({ type: 'SampleError' });
  const result = mapConvert(input);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'SampleError' });
  }
});
