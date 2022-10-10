import { Result } from './Result';

type TeeAsync = <A>(
  fn: (a: A) => Promise<void>,
) => <E>(input: Result<A, E>) => Promise<Result<A, E>>;

/**
 * 行き止まり関数を2トラック関数に変換する
 *
 * @param fn 入力Tを受け取り、何も出力せずに副作用を発生させる非同期な関数
 * @returns 元々の入力で指定されたResult型を返す
 */
export const teeAsync: TeeAsync = (fn) => async (input) => {
  if (!input.ok) return input;

  await fn(input.value);
  return input;
};
