import { Result, BaseError, err } from './Result';
import { Transform } from './functions';

export type OneWayTrackFn<T, U, E extends BaseError> = Transform<
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
export const bind =
  <T, U, E extends BaseError>(fn: OneWayTrackFn<T, U, E>) =>
  <F extends BaseError>(input: Result<T, E | F>) => {
    if (!input.ok) return err(input.error);

    return fn(input.value);
  };
