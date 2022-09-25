import { expect, test } from 'vitest';
import { bind } from './bind';
import { err, ok, Result } from './Result';

const EmptyStringError = {
  type: 'EmptyStringError',
} as const;
type EmptyStringError = typeof EmptyStringError;

const hello = (name: string): Result<string, EmptyStringError> => {
  if (name === '') {
    return err(EmptyStringError);
  }

  return ok(`hello ${name}`);
};

test('1ウェイトラック関数', () => {
  const input = 'shimokawa';
  const result = hello(input);

  expect(result.ok).toBe(true);
});

test('[成功ケース] bind関数で、1ウェイトラック関数を2ウェイトラック関数に変換する', () => {
  const twoTrackHello = bind(hello);

  const input = ok('shimokawa');
  const result = twoTrackHello(input);

  expect(result.ok).toBe(true);
  if (result.ok) expect(result.value).toBe('hello shimokawa');
});

test('[失敗ケース] bind関数で、1ウェイトラック関数を2ウェイトラック関数に変換する', () => {
  const twoTrackHello = bind(hello);

  const input = ok('');
  const result = twoTrackHello(input);

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'EmptyStringError' });
  }
});
