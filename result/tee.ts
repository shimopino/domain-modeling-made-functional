import { Result } from './Result';

type Tee = <A>(fn: (a: A) => void) => <E>(input: Result<A, E>) => Result<A, E>;

/**
 * 行き止まり関数を2トラック関数に変換する
 *
 * @param fn 入力Tを受け取り、何も出力せずに副作用を発生させる関数
 * @returns 元々の入力で指定されたResult型を返す
 */
export const tee: Tee = (fn) => (input) => {
  if (!input.ok) return input;

  fn(input.value);
  return input;
};
