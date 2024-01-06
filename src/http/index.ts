import ResponseError from './responseError';
import { defaultInit } from './defaults';
import type { HTTPContentFormat } from '@/editables/types';

export default class HTTP {
  private readonly _baseURL: RequestInfo | URL;

  public constructor(baseURL: RequestInfo | URL) {
    this._baseURL = baseURL;
  }

  public get baseURL(): RequestInfo | URL {
    return this._baseURL;
  }

  public async get<T extends Record<string, unknown> | Record<string, unknown>[]>(
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(this.baseURL, init);
    if (!res.ok) throw new ResponseError(res.status, res.statusText, res.url);

    return (await res.json()) as T;
  }

  public async post<
    T extends Record<string, unknown> | Record<string, unknown>[],
    TBody extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
  >(body: TBody, format: HTTPContentFormat = 'json', init?: RequestInit): Promise<T> {
    const res = await fetch(this.baseURL, defaultInit(body, 'POST', format, init));
    if (!res.ok) throw new ResponseError(res.status, res.statusText, res.url);

    return (await res.json()) as T;
  }
}
