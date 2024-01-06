interface DataLoaded<
  TData = Record<PropertyKey, unknown> | Record<PropertyKey, unknown>[],
> {
  readonly data: TData;
}

interface HTTPErrorEvent {
  readonly status: number;
  readonly message: string;
  readonly url: string;
}

interface ErrorEvent {
  readonly message: string;
}

export enum EditableEvent {
  DATA_LOADED = 'data-loaded',
  HTTP_ERROR = 'http-error',
  ERROR = 'error',
}

export interface EditablesEventMap<
  TData extends Record<PropertyKey, unknown> | Record<PropertyKey, unknown>[],
> extends Record<PropertyKey, unknown> {
  readonly [EditableEvent.DATA_LOADED]: DataLoaded<TData>;
  readonly [EditableEvent.HTTP_ERROR]: HTTPErrorEvent;
  readonly [EditableEvent.ERROR]: ErrorEvent;
}
