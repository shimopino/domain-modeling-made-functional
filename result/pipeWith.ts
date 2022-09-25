import { pipe, UnknownFunction } from './pipe';

export function pipeWith<A, B>(a: A, ab: (this: void, a: A) => B): B;
export function pipeWith<A, B, C>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
): C;
export function pipeWith<A, B, C, D>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
): D;
export function pipeWith<A, B, C, D, E>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
): E;
export function pipeWith(value: unknown, ...fns: UnknownFunction[]): unknown {
  return pipe(
    // Our overloads do not currently support arrays
    // @ts-expect-error 一旦無視
    ...fns,
  )(value);
}
