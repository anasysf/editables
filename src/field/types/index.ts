export type FieldType = 'string' | 'number';

export interface FieldOptions<T extends FieldType> {
  readonly name: string;
  readonly type: T;
}
