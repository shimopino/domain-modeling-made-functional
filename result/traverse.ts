import { ok } from 'assert';
import { BaseError, Result } from './Result';

/**
 * 単一の値に対するResultを返す関数を、リストに対して適用する
 * (a: A) => Result<B> : (a: A[]) => Result<B[]>
 */
export const traverse =
  <A, B, E extends BaseError>(fn: (t: A) => Result<B, E>) =>
  (inputs: A[]) => {
    if (inputs.length === 0) ok(inputs);

    const [head, ...tail] = inputs;
    const headR = fn(head)
    const tailR = traverse(fn)(tail)
    const results = ok([headR, traverse(fn)(tail)]);
    return results;
  };
