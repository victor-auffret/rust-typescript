export class Mut<T> {
  private inner: T | undefined;

  constructor(value: T) {
    this.inner = value;
  }

  /** Simule un `move` : rend la valeur et la rend inaccessible par la suite */
  move(): T {
    if (this.inner === undefined) {
      throw new Error("Value has already been moved");
    }
    const value = this.inner;
    this.inner = undefined; // invalide l’accès ultérieur
    return value;
  }

  /** Lecture temporaire, sans "consommer" */
  borrow(): T {
    if (this.inner === undefined) {
      throw new Error("Cannot borrow after move");
    }
    return this.inner;
  }

  toString(): string {
    const value = this.borrow();
    return String(value);
  }

  /** Permet de vérifier si la valeur est encore vivante */
  isValid(): boolean { return this.inner !== undefined; }
}
