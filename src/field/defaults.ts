import type { FieldOptions, FieldType } from './types';

export function defaultFieldOptions<T extends FieldType>(
  fieldOptions: Partial<FieldOptions<T>>,
): FieldOptions<T> {
  if (!fieldOptions.name) throw new ReferenceError('The property `name` is required.');

  return {
    name: fieldOptions.name,
    type: fieldOptions.type ?? ('string' as T),
  };
}
