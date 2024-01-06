import type { IDataSrcPost, Options } from './types';
import { validateString, isObject } from '@/utils/validator';

export function isIDataSrcPost(dataSrc: unknown): dataSrc is IDataSrcPost {
  return !validateString(dataSrc) && isObject(dataSrc) && dataSrc.method === 'POST';
}

/**
 * Validate that the element passed is a <table> element.
 * @param element - The element to validate.
 *
 * @internal
 * @returns If the element is a <table> element.
 */
export function elementIsTable(element: HTMLElement | null): element is HTMLTableElement {
  return (
    element !== null && element instanceof HTMLTableElement && element.tagName === 'TABLE'
  );
}

/**
 * Validate that the options passed belong to the Options interface.
 * @param options - The options to validate.
 *
 * @internal
 * @returns If the options passed belong to the Options interface.
 */
export function isOptions(options: unknown): options is Options {
  return isObject(options) && 'dataSrc' in options;
}

export function getByProp<O extends Record<string, unknown>, P extends keyof O = keyof O>(
  obj: O,
  prop: P,
): O {
  if (String(prop).trim().length === 0) return obj;
  else if (!(prop in obj))
    throw new ReferenceError(`Could not find ${String(prop)} in the object.`);

  return obj[prop] as O;
}

export function filterObjProps<
  O extends Record<string, unknown>,
  P extends keyof O = keyof O,
>(obj: O, props: P[]): O {
  const result: O = {} as O;
  for (const key of props) if (key in obj) result[key] = obj[key];

  return result;
}
