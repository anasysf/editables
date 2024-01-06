import type { Table, Options, DataSrc, HTTPContentFormat } from './types';
import { EditableEvent } from './types/events';
import type { EditablesEventMap } from './types/events';
import EventEmitter from '@/utils/eventEmitter';
import { defaultOptions } from './defaults';
import HTTP from '@/http';
import ResponseError from '@/http/responseError';
import {
  isIDataSrcPost,
  isOptions,
  elementIsTable,
  getByProp,
  filterObjProps,
} from './utils';
import type Field from '@/field';
import { isArray, exists, canBeStringified } from '@/utils/validator';
import { getPropFromObj } from '@/utils';

/**
 * A class representing an Editables instance.
 * @typeParam TData - The data type.
 */
export default class Editables<
  TData extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
> extends EventEmitter<EditablesEventMap<TData | TData[]>> {
  /** The Table object. */
  private _table!: Table;

  /** The instance options. */
  private _options!: Options;

  /** The data. */
  private _data!: TData | TData[];

  /** The fields. */
  private _fields!: Map<string, Field>;

  /**
   * Create a new Editables instance.
   * @param tableId - The HTML Table element's id.
   * @param options - The Editables instance options.
   *
   * @throws {TypeError} If the tableId is not a string or if it's undefined.
   * @throws {TypeError} If the tableId does not belong to a <table> element.
   * @throws {TypeError} If the options object passed does not respect the `Options` interface schema.
   */
  public constructor(tableId?: string, options?: Options) {
    if (!tableId || typeof tableId !== 'string')
      throw new TypeError(
        `Invalid table id, expected string instead received: ${tableId}.`,
      );

    const table = document.getElementById(tableId);
    if (!elementIsTable(table))
      throw new TypeError(
        `Expected the element with the id: ${tableId} to be a <table> element.`,
      );

    super();

    this.table = table;

    if (!isOptions(options))
      throw new TypeError(
        'The `options` object passed does not respect the `Options` interface.',
      );
    this.options = options;

    this.fields = this.options.fields;

    void this.init();
  }

  /**
   * Get the private _table property.
   *
   * @returns The {@link Table} object.
   */
  public get table(): Table {
    return this._table;
  }

  /**
   * Get the table rows.
   *
   * @returns An array of the table <tr> elements.
   */
  public get trs(): HTMLTableRowElement[] {
    return this.table.rows;
  }

  /**
   * Get the table tbodies.
   *
   * @returns An array of the table <tbody> elements.
   */
  public get tBodies(): HTMLTableSectionElement[] {
    return this.table.tBodies;
  }

  /**
   * Get the private _options property.
   *
   * @returns The options passed to this Editables instance.
   */
  public get options(): Options {
    return this._options;
  }

  /**
   * Get the dataSrc property.
   *
   * @returns The dataSrc that the Editables instance uses to load the data.
   */
  public get dataSrc(): DataSrc {
    return this.options.dataSrc;
  }

  /**
   * Get the dataSrc.source property.
   *
   * @returns The endpoint that the Editables instance uses to load the data.
   */
  public get dataSrcSource(): string {
    return typeof this.dataSrc === 'object' ? this.dataSrc.source : this.dataSrc;
  }

  /**
   * Get the dataSrc.method property.
   *
   * @returns The dataSrc method that the Editables instance uses to load the data.
   */
  public get dataSrcMethod(): string {
    return typeof this.dataSrc === 'object' ? this.dataSrc.method : 'GET';
  }

  /**
   * Get the dataSrc.method property.
   *
   * @returns The dataSrc method that the Editables instance uses to load the data.
   */
  public get dataSrcBody(): Record<PropertyKey, unknown> | undefined {
    return isIDataSrcPost(this.dataSrc) ? this.dataSrc.body : undefined;
  }

  /**
   * Get the dataSrc.format property.
   *
   * @returns The dataSrc format that the Editables instance uses to send the data to the server to load the data.
   */
  public get dataSrcFormat(): HTTPContentFormat {
    return isIDataSrcPost(this.dataSrc) ? this.dataSrc.format ?? 'json' : 'json';
  }

  /**
   * Get the dataSrc.prop property.
   *
   * @returns The dataSrc prop that the Editables instance uses to load the data from.
   */
  public get dataSrcProp(): string {
    return typeof this.dataSrc === 'object' ? this.dataSrc.prop ?? '' : '';
  }

  public get data(): TData | TData[] {
    return this._data;
  }

  public get fields(): Map<string, Field> {
    return this._fields;
  }

  private get dataFields(): TData | TData[] {
    return isArray(this.data)
      ? this.data.map((obj) =>
          filterObjProps(
            obj,
            exists(this.rowIdProp)
              ? [...this.fields.keys(), this.rowIdProp]
              : Array.from(this.fields.keys()),
          ),
        )
      : filterObjProps(
          this.data,
          exists(this.rowIdProp)
            ? [...this.fields.keys(), this.rowIdProp]
            : Array.from(this.fields.keys()),
        );
  }

  private get rowIdProp(): string | undefined {
    return this.options.rowId;
  }

  /**
   * Set the private _table property.
   * @param tableElement - The HTML Table element.
   *
   * @internal
   */
  private set table(tableElement: HTMLTableElement) {
    this._table = {
      id: tableElement.id,
      rows: Array.from(tableElement.rows),
      tBodies: Array.from(tableElement.tBodies),
      element: tableElement,
    };
  }

  /**
   * Set the private _options property.
   * @param options - The options passed to this instance.
   *
   * @internal
   */
  private set options(options: Options) {
    this._options = defaultOptions(options);
  }

  private set data(data: TData | TData[]) {
    this._data = data;
  }

  private set fields(fields: Field[]) {
    this._fields = new Map(fields.map((field) => [field.name, field]));
  }

  private async init(): Promise<void> {
    this.data = await this.loadData();
    this.constructTBody();
  }

  private constructTBody(): void {
    const tBody =
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      this.tBodies.length === 0 ? this.table.element.createTBody() : this.tBodies.at(0)!;

    if (isArray(this.dataFields)) {
      this.generateCells(this.dataFields, tBody);
      return;
    } else {
      const trFragment = document.createDocumentFragment();
      const tr = trFragment.appendChild(document.createElement('tr'));

      this.setCellContent(tr, this.dataFields, tBody);
      return;
    }
  }

  private generateCells(data: TData[], tBody: HTMLTableSectionElement): void {
    for (const obj of data) {
      const trFragment = document.createDocumentFragment();
      const tr = trFragment.appendChild(document.createElement('tr'));

      if (this.rowIdProp) {
        const id = getPropFromObj(obj, this.rowIdProp as Extract<keyof TData, string>);

        if (!canBeStringified(obj[id])) throw new TypeError(`${id} is not a valid type.`);

        tr.id = String(obj[id as keyof typeof obj]);
      }

      this.setCellContent(tr, obj, tBody);
    }
  }

  private setCellContent(
    tr: HTMLTableRowElement,
    data: TData,
    tBody: HTMLTableSectionElement,
  ): void {
    for (const value of Object.values(data)) {
      const td = tr.insertCell();
      td.textContent = String(value);
      tBody.appendChild(tr);
    }
  }

  private async loadData(): Promise<TData | TData[]> {
    const resData = await this.getData();
    if (!resData || resData.length === 0)
      throw new TypeError(`Expected an array of objects or an object.`);

    const data = !isArray(resData)
      ? getByProp(resData, this.dataSrcProp)
      : resData.map((d) => getByProp(d, this.dataSrcProp));

    super.emit(EditableEvent.DATA_LOADED, { data });

    return data;
  }

  private async getData(): Promise<TData | TData[] | undefined> {
    const http = new HTTP(this.dataSrcSource);

    try {
      if (isIDataSrcPost(this.dataSrc))
        return await http.post<TData | TData[]>(
          this.dataSrcBody ?? {},
          this.dataSrcFormat,
        );

      return await http.get<TData | TData[]>();
    } catch (err) {
      if (!(err instanceof ResponseError)) {
        super.emit(EditableEvent.ERROR, {
          message: (err as Error).message,
        });
        return;
      }

      super.emit(EditableEvent.HTTP_ERROR, {
        message: err.message,
        status: err.status,
        url: err.url,
      });
      return;
    }
  }
}
