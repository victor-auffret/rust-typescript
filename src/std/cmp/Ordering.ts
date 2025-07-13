export enum Ordering {
  Less = -1,
  Equal = 0,
  Greater = 1,
}

export function cmp<T>(a: T, b: T): Ordering {
  if (a < b) return Ordering.Less;
  if (a > b) return Ordering.Greater;
  return Ordering.Equal;
}

// Handlers avec retour R
export type Handler<R> = {
  [key in Ordering]?: () => R;
} & {
  _: () => R; // handler par défaut, obligatoire si tu ne couvres pas tous les cas
};

// Match qui retourne R
export function Match<R = void>(value: Ordering, handlers: Handler<R>): R {
  if (value in handlers) {
    return handlers[value]!(); // exécute le handler correspondant
  }
  return handlers._(); // fallback sur la wildcard
}
