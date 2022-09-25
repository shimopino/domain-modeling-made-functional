export type Transform<T, U> = (input: T) => U;
export type AsyncTransform<T, U> = (input: T) => Promise<U>;
