export function getPropFromObj<
  O extends Record<PropertyKey, unknown>,
  P extends Extract<keyof O, string>,
>(obj: O, prop: P): P {
  if (!(prop in obj))
    throw new ReferenceError(`Could not find ${prop} in the target object.`);

  return prop;
}
