export type AsyncFn<I, O> = (input: Awaited<I>) => O | Promise<O>;

export async function pipeAsync<A>(a: A): Promise<A>;
export async function pipeAsync<A, B>(a: A, b: AsyncFn<A, B>): Promise<B>;
export async function pipeAsync<A, B, C>(
  a: A,
  ab: AsyncFn<A, B>,
  bc: AsyncFn<B, C>,
): Promise<C>;
export async function pipeAsync<A, B, C, D>(
  a: A,
  ab: AsyncFn<A, B>,
  bc: AsyncFn<B, C>,
  cd: AsyncFn<C, D>,
): Promise<D>;
export async function pipeAsync<A, B, C, D, E>(
  a: A,
  ab: AsyncFn<A, B>,
  bc: AsyncFn<B, C>,
  cd: AsyncFn<C, D>,
  de: AsyncFn<D, E>,
): Promise<E>;
export async function pipeAsync(init: unknown, ...fns: any[]) {
  let it = await init;
  for (const fn of fns) {
    it = await fn(it);
  }
  return it;
}
