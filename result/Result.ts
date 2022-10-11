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

export const isOk = <T, E>(input: Result<T, E>): input is Ok<T> => {
  return input.ok;
};

export const isErr = <T, E>(input: Result<T, E>): input is Err<E> => {
  return !input.ok;
};
