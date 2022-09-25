// https://github.com/unsplash/pipe-ts/blob/master/src/index.ts
export type UnknownFunction = (...params: unknown[]) => unknown;

export function pipe<A extends unknown[], B>(
  ab: (this: void, ...a: A) => B,
): (...args: A) => B;
export function pipe<A extends unknown[], B, C>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
): (...args: A) => C;
export function pipe<A extends unknown[], B, C, D>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
): (...args: A) => D;
export function pipe<A extends unknown[], B, C, D, E>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
): (...args: A) => E;
export function pipe(...fns: UnknownFunction[]): UnknownFunction {
  return (...initialParams: unknown[]): unknown =>
    fns.reduce<unknown>((value, fn, index) => {
      const params = index === 0 ? (value as unknown[]) : [value];
      return fn(...params);
    }, initialParams);
}
