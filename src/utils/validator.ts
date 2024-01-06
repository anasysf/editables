type Fn = (...args: unknown[]) => unknown;

export function exists<T>(value: T): value is Exclude<T, undefined | null> {
  return value !== undefined && value !== null;
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return (
    exists(value) &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Function)
  );
}

export function isString(str: unknown): str is string {
  return typeof str === 'string';
}

export function validateString(str: unknown): boolean {
  return isString(str) && str.trim().length !== 0;
}

export function isFn(target: unknown): target is Fn {
  return target instanceof Function;
}

export function canBeStringified<T>(
  target: T,
): target is Exclude<
  T,
  undefined | null | Record<PropertyKey, unknown> | Fn | unknown[]
> {
  return (
    (exists(target) && isString(target)) ||
    (!isArray(target) && !isObject(target) && !isFn(target))
  );
}
