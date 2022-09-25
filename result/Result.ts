export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => {
  return {
    ok: true,
    value,
  };
};

export const err = <E>(error: E): Err<E> => {
  return {
    ok: false,
    error,
  };
};

type ResultFunc<T, E> = (args: any) => Result<T, E>;

export const bind =
  <T, E>(cb: ResultFunc<T, E>) =>
  (result: Result<T, E>) => {
    if (result.ok) {
      return cb(result.value);
    } else {
      return err(result.error);
    }
  };

export const mapError =
  <T, E>(cb: ResultFunc<T, E>) =>
  (result: Result<T, E>) => {
    if (result.ok) {
      return ok(result.value);
    } else {
      return err(cb(result.error));
    }
  };
