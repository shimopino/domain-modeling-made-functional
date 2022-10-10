import { expect, test } from 'vitest';
import { pipe } from '../pipe';
import { err, ok } from '../Result';
import { bind } from '../bind';
import { map } from '../map';
import { tee } from '../tee';

const workflow = pipe(
  (a: string) => {
    if (a.length === 0) return err('empty');
    return ok(Number(a));
  },
  bind((a) => {
    const result = a + 50;
    if (result > 100) return err('over 100');
    return ok(result);
  }),
  map((a) => {
    return a + 20;
  }),
  tee((a) => console.log({ log: a })),
);

test('[成功ケース] パイプラインを構築する', () => {
  const result = workflow('20');

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe(90);
  }
});

test('[失敗ケース] パイプラインを構築する', () => {
  const result = workflow('80');

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toBe('over 100');
  }
});
