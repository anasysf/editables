import type { Options, DataSrc, IDataSrc, IDataSrcPost } from './types';
import { isObject, isArray, exists, validateString } from '@/utils/validator';
import type Field from '@/field';

export function defaultOptions(options: Partial<Options>): Options {
  return {
    ...options,
    dataSrc: defaultDataSrc(options.dataSrc),
    fields: defaultFields(options.fields),
  };
}

const defaultFields = (fields?: Field[]): Field[] => {
  if (isArray(fields)) return fields;
  else throw new TypeError('The `fields` in `options` does not respect the schema.');
};

const defaultDataSrc = (dataSrc?: DataSrc): DataSrc => {
  if (isObject(dataSrc)) {
    if (!exists(dataSrc.source) || !('source' in dataSrc))
      throw new ReferenceError('The `source` property in `dataSrc` is required.');

    return {
      source: (dataSrc as IDataSrc).source,
      method: (dataSrc as Partial<IDataSrc>).method ?? 'GET',
      body: (dataSrc as IDataSrcPost).body,
      format: (dataSrc as IDataSrcPost).format,
      prop: (dataSrc as IDataSrc).prop ?? '',
    };
  } else if (validateString(dataSrc)) return dataSrc as string;
  else throw new TypeError('The `dataSrc` in `options` does not respect the schema.');
};
