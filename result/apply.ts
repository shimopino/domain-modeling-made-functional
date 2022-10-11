import { Result, ok } from './Result';

type Apply = <E2, A>(
  fa: Result<A, E2>,
) => <E1, B>(fab: Result<(a: A) => B, E1>) => Result<B, E1 | E2>;

/**
 * E<a->b> => E<a> -> E<b>
 *
 * @param fa
 * @returns
 */
export const apply: Apply = (fa) => (fab) => {
  if (!fab.ok) return fab;
  if (!fa.ok) return fa;

  return ok(fab.value(fa.value));
};
