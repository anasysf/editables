import type { InitOptions, Options } from './types';
import type { ColumnObj } from './types/column';

/** Creates a new `Editables` instance. */
export default class Editable {
  /** Current instance's options. */
  public options: Options;

  /** Container element, usually a `<div>`. */
  public containerEl: HTMLDivElement;

  /** Current instance's `<table>` element. */
  public tableEl: HTMLTableElement;

  /** Current instance's `columns`. */
  public columns: ColumnObj[] = [];

  /** Current instance's `rows`. */
  public rows: unknown[][] = [];

  public constructor(containerEl: HTMLDivElement, options: InitOptions) {
    this.containerEl = containerEl;
    this.options = { ...options };

    this.tableEl = this.createTableEl();
  }

  /**
   * Initiate the `<table>` element and attach it to the given `containerEl`.
   * Assigns the created `<table>` element to `tableEl`.
   */
  private createTableEl(): HTMLTableElement {
    const tableFrag = new DocumentFragment();
    const table = document.createElement('table');
    table.createTHead();
    table.createTBody();

    tableFrag.append(table);
    this.containerEl.appendChild(tableFrag);

    return table;
  }

  /**
   * Set the current instance's `columns` to the given columns.
   *
   * @remarks
   * This method replaces the current `columns` with ones given.
   * If you want to keep the current `columns` and append to them instead.
   * use `addColumns`.
   *
   * @param columns - The columns used.
   * @returns The `Editable` instance.
   */
  public setColumns(columns: ColumnObj[]): Editable {
    if (columns.length === 0)
      throw new SyntaxError('Expected at least 1 column in the array, got: 0');

    const tHead = this.tableEl.tHead ?? this.tableEl.createTHead();

    if (tHead.rows.length > 0) tHead.deleteRow(0);
    const tr = tHead.rows.item(0) ?? tHead.insertRow();

    for (let i = 0; i < columns.length; i++) {
      const currentColumn = columns[i];

      currentColumn.type = currentColumn.type ?? 'string';
      currentColumn.key = currentColumn.key
        ? `${currentColumn.key}-${i}`
        : i.toString();

      const td = tr.insertCell();
      td.textContent = currentColumn.name;
      td.dataset.key = currentColumn.key;
      td.dataset.columnType = currentColumn.type;
    }

    this.columns = columns;
    return this;
  }

  /**
   * Append the given columns to the current instance's columns.
   *
   * @remarks
   * This method appends the given columns to the current instance's columns.
   * If you want to replace the current columns instead.
   * use `setColumns`.
   *
   * @param columns - The columns used.
   * @returns The `Editable` instance.
   */
  public addColumns(columns: ColumnObj[]): Editable {
    if (columns.length === 0)
      throw new SyntaxError('Expected at least 1 column in the array, got: 0');

    const tHead = this.tableEl.tHead ?? this.tableEl.createTHead();
    const tr = tHead.rows.item(0) ?? tHead.insertRow();

    for (let i = 0; i < columns.length; i++) {
      const currentColumn = columns[i];

      currentColumn.type = currentColumn.type ?? 'string';
      currentColumn.key = currentColumn.key
        ? `${currentColumn.key}-${i}`
        : i.toString();

      const td = tr.insertCell();
      td.textContent = currentColumn.name;
      td.dataset.key = currentColumn.key;
      td.dataset.columnType = currentColumn.type;

      this.columns.push(currentColumn);
    }

    return this;
  }

  /**
   * Set the current instance's `rows` to the given rows.
   *
   * @remarks
   * This method replaces the current `rows` with ones given.
   * If you want to keep the current `rows` and append to them instead.
   * use `addRows`.
   *
   * @param rows - The rows used.
   * @returns The `Editable` instance.
   */
  public setRows(rows: unknown[][]): Editable {
    if (rows.length === 0)
      throw new SyntaxError('Expected at least 1 row in the array, got: 0');

    const tBody = this.tableEl.tBodies.item(0) ?? this.tableEl.createTBody();

    for (let i = 0; i < tBody.rows.length; i++) tBody.deleteRow(i);

    for (const rowsI of rows) {
      const tr = tBody.insertRow();

      for (const rowContent of rowsI) {
        const td = tr.insertCell();
        td.textContent = String(rowContent);
      }
    }

    this.rows = rows;
    return this;
  }
}
