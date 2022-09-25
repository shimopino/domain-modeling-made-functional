export type BaseError = { type: string };
export type Ok<T> = { ok: true; value: T };
export type Err<E extends BaseError> = { ok: false; error: E };
export type Result<T, E extends BaseError> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => {
  return {
    ok: true,
    value,
  };
};

export const err = <E extends BaseError>(error: E): Err<E> => {
  return {
    ok: false,
    error,
  };
};
