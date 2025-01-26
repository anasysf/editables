/** The table's column object. */
export type ColumnObj = {
  /** The name of the column. */
  readonly name: string;

  /** The unique key that is used to identify the column. */
  key: string | undefined;

  /** The type of the column. */
  type: ColumnType | undefined;
};

/** The type of the column. */
type ColumnType = 'string' | 'number' | 'boolean' | 'html';
