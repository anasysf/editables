import type { FieldOptions, FieldType } from './types';
import { defaultFieldOptions } from './defaults';

export default class Field<T extends FieldType = FieldType> {
  private _options!: FieldOptions<T>;

  public constructor(options: Partial<FieldOptions<T>>) {
    this.options = options;
  }

  public get options(): FieldOptions<T> {
    return this._options;
  }

  public get name(): string {
    return this.options.name;
  }

  public get type(): T {
    return this.options.type;
  }

  public set options(options: Partial<FieldOptions<T>>) {
    this._options = defaultFieldOptions(options);
  }
}
