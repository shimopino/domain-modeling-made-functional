import { Result, BaseError, err } from './Result';
import { AsyncTransform } from './functions';

export type OneWayTrackAsyncFn<T, U, E extends BaseError> = AsyncTransform<
  T,
  Result<U, E>
>;

/**
 * 1-wayトラック関数を、2-wayトラック関数に変換する
 *
 * Result型ではない値を引数に受け取り、Result型を返す関数を
 * Result型を引数で受け取ることができる形式の関数に変換する
 *
 * @param fn 引数T を Result<U, E> に変換する関数
 * @returns 引数を Result<T, E> を受け入れることができる関数
 */
export const bindAsync =
  <T, U, E extends BaseError>(fn: OneWayTrackAsyncFn<T, U, E>) =>
  async <F extends BaseError>(input: Result<T, E | F>) => {
    if (!input.ok) return err(input.error);

    const result = await fn(input.value);
    return result;
  };
