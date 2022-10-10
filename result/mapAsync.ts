import { ok, Result } from './Result';

type MapAsync = <A, B>(
  fn: (a: A) => Promise<B>,
) => <E>(input: Result<A, E>) => Promise<Result<B, E>>;

/**
 * Result型ではない入出力の型を有する関数の出力を、Result型に変換する
 *
 * エラーが発生しない関数に対して適用し、パイプラインで繋げた時に1つ前から
 * 渡されるResult型のエラーをそのまま使用する
 *
 * @param fn Result型を使用しない関数
 * @returns 元の関数の出力をResult型に変換した関数
 */
export const mapAsync: MapAsync = (fn) => async (input) => {
  if (!input.ok) {
    return input;
  }

  const result = await fn(input.value);
  return ok(result);
};
