import { expect, test } from 'vitest';
import { err, ok, Result } from '../Result';
import { pipeWith } from '../pipeWith';
import { bind } from '../bind';
import { bindAsync } from '../bindAsync';
import { sleep } from '../utils/sleep';

type NonNegativeError = { type: 'NonNegativeError' };
type Over20Error = { type: 'Over20Error' };
type Contain20Error = { type: 'Contain20Error' };

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

const stringHello = async (
  input: string,
): Promise<Result<string, Contain20Error>> => {
  await sleep(500);

  if (input.includes('20')) {
    return err({ type: 'Contain20Error' });
  }

  return ok(`hello ${input}`);
};

test('関数を結合させていく', async () => {
  const result = await pipeWith(
    5,
    add10,
    bind(numberToString),
    bindAsync(stringHello),
  );

  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value).toBe('hello 15');
  }
});

test('[NonNegativeError] 関数を結合させていく', async () => {
  const result = await pipeWith(
    -10,
    add10,
    bind(numberToString),
    bindAsync(stringHello),
  );

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'NonNegativeError' });
  }
});

test('[Over20Error] 関数を結合させていく', async () => {
  const result = await pipeWith(
    20,
    add10,
    bind(numberToString),
    bindAsync(stringHello),
  );

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'Over20Error' });
  }
});

test('[Contain20Error] 関数を結合させていく', async () => {
  const result = await pipeWith(
    10,
    add10,
    bind(numberToString),
    bindAsync(stringHello),
  );

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'Contain20Error' });
  }
});

// 非同期処理の後で同期処理を連結させる
type Contain15Error = { type: 'Contain15Error' };
const sayGoodBye = (input: string): Result<string, Contain15Error> => {
  if (input.includes('15')) {
    return err({ type: 'Contain15Error' })
  }

  return ok(`${input} goodbye`)
};

test('[Contain15Error] 非同期処理の後で同期処理を連結させる', async () => {
  const result = await pipeWith(
    10,
    add10,
    bind(numberToString),
    bindAsync(stringHello),
  );

  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.error).toEqual({ type: 'Contain20Error' });
  }
})
