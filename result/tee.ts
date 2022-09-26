import { Effect } from './functions';
import { BaseError, Result } from './Result';

/**
 * 行き止まり関数を2トラック関数に変換する
 *
 * @param fn 入力Tを受け取り、何も出力せずに副作用を発生させる関数
 * @returns 元々の入力で指定されたResult型を返す
 */
export const tee =
  <T>(fn: Effect<T>) =>
  <E extends BaseError>(input: Result<T, E>) => {
    if (!input.ok) return input;

    fn(input.value);
    return input;
  };
