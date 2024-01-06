import type { HTTPContentFormat } from '@/editables/types';

export function defaultInit<TBody extends Record<PropertyKey, unknown>>(
  body: TBody,
  method: string,
  format: HTTPContentFormat = 'json',
  init?: RequestInit,
): RequestInit {
  init = {
    ...init,
    method,
    headers: defaultHeaders(format),
    body: defaultBody(body, format),
  };

  return init;
}

const defaultHeaders = (format: HTTPContentFormat = 'json'): HeadersInit => ({
  'Content-Type': format === 'json' ? 'application/json' : 'multipart/form-data',
});

const defaultBody = <TBody extends Record<PropertyKey, unknown>>(
  body: TBody,
  format: HTTPContentFormat = 'json',
): BodyInit => {
  if (format === 'json') {
    try {
      return JSON.stringify(body);
    } catch (err) {
      throw new TypeError('The body passed is not a valid JSON.');
    }
  } else {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, String(body[key]));
    }

    return formData;
  }
};
