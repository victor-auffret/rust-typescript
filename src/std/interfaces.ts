interface IOption<T> {
  isSome(): this is Some<T>;
  isNone(): this is None;
  unwrap(): T;
}

export class Some<T> implements IOption<T> {
  readonly kind = 'some' as const;
  constructor(protected value: T) {}
  isSome(): this is Some<T> { return true; }
  isNone(): this is None { return false; }
  unwrap(): T { return this.value; }
}

export class None implements IOption<never> {
  readonly kind = 'none' as const;
  constructor() {}
  isSome(): this is Some<never> { return false; }
  isNone(): this is None { return true; }
  unwrap(): never { throw new Error("Tried to unwrap None"); }
}

export class Ok<T> {
  readonly kind = 'ok' as const;
  constructor(protected readonly value: T) {}
  isOk(): this is Ok<T> { return true; }
  isErr(): this is Err<any> { return false; }
  unwrap(): T { return this.value; }
}

export class Err<E> {
  readonly kind = 'err' as const;
  constructor(public readonly error: E) {}
  isOk(): this is Ok<never> { return false; }
  isErr(): this is Err<E> { return true; }
  unwrap(): never { throw new Error(`Called unwrap on Err: ${this.error}`); }
}

export type Result<T, E> = Ok<T> | Err<E>;
export function ok<T>(value: T): Result<T, never> { return new Ok(value); }
export function err<E>(error: E): Result<never, E> { return new Err(error); }
