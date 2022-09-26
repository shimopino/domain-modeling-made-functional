export type Transform<T, U> = (input: T) => U;
export type Effect<T> = (input: T) => void;
export type AsyncTransform<T, U> = (input: T) => Promise<U>;
export type AsyncEffect<T> = (input: T) => Promise<void>;
