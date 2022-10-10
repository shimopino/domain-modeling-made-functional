import { Result, err } from './Result';

type BindAsync = <A, B, E>(
  fn: (a: A) => Promise<Result<B, E>>,
) => <F>(input: Result<A, F>) => Promise<Result<B, E | F>>;

/**
 * 1-wayトラック関数を、2-wayトラック関数に変換する
 *
 * Result型ではない値を引数に受け取り、Result型を返す関数を
 * Result型を引数で受け取ることができる形式の関数に変換する
 *
 * @param fn 引数T を Result<U, E> に変換する関数
 * @returns 引数を Result<T, E> を受け入れることができる関数
 */
export const bindAsync: BindAsync = (fn) => async (input) => {
  if (!input.ok) return err(input.error);

  const result = await fn(input.value);
  return result;
};
