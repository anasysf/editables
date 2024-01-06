import type Field from '@/field';

/** The Table object. */
export interface Table {
  /** The table's id. */
  readonly id: HTMLTableElement['id'];
  /** An array of the table's rows. */
  readonly rows: HTMLTableRowElement[];
  /** An array of the table's tbodies. */
  readonly tBodies: HTMLTableSectionElement[];
  readonly element: HTMLTableElement;
}

export type IDataSrc = {
  readonly source: string;
  readonly prop?: string;
} & (IDataSrcGet | IDataSrcPost);

export interface IDataSrcGet {
  readonly method: 'GET';
}

export type HTTPContentFormat = 'json' | 'form-data';

export interface IDataSrcPost {
  readonly method: 'POST';
  readonly body?: Record<PropertyKey, unknown>;
  readonly format?: HTTPContentFormat;
}

export type DataSrc = IDataSrc | string;

/**
 * The options passed to the Editables instance.
 */
export interface Options {
  /**
   * The source of the data, could be an IDataSrc object or a string.
   *
   * @example string example.
   *
   * # Usage: `string`.
   *
   * ```javascript
   * const editables = new Editables('my-table', {
   *    dataSrc: 'https://dummyjson.com/products',
   *    ...the_rest_of_the_options,
   * });
   * ```
   * @example IDataSrc example.
   *
   * # Usage: `GET` request.
   *
   * ```javascript
   * const editables = new Editables('my-table', {
   *    dataSrc: {
   *      source: 'https://dummyjson.com/products',
   *      prop: 'products',
   *      method: 'GET',
   *    },
   *    ...the_rest_of_the_options,
   * });
   * ```
   *
   * # Usage: `POST` request.
   *
   * ```javascript
   * const editables = new Editables('my-table', {
   *    dataSrc: {
   *      source: 'https://your/post/endpoint',
   *      prop: '',
   *      method: 'POST',
   *      data: {
   *        id: 300,
   *      },
   *      format: 'json',
   *    },
   *    ...the_rest_of_the_options,
   * });
   * ```
   */
  readonly dataSrc: DataSrc;

  readonly fields: Field[];

  readonly rowId?: string;
}
