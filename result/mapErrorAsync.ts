import { err, ok, Result } from './Result';

type MapErrorAsync = <E, F>(
  fn: (e: E) => Promise<F>,
) => <A>(input: Result<A, E>) => Promise<Result<A, F>>;

/**
 * 関数から出力されるResult型のエラーを、別のエラー型に変換する
 *
 * 関数固有のエラー型を、パイプラインで共通のエラー型などに変換する際に使用する
 *
 * @param fn あるエラー型 E を別のエラー型 F に変換する関数
 * @returns 入力の引数は変わらず、出力のエラー型が F に変換された関数
 */
export const mapErrorAsync: MapErrorAsync = (fn) => async (input) => {
  if (input.ok) {
    return ok(input.value);
  }

  const result = await fn(input.error);
  return err(result);
};
