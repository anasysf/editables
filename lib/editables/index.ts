import { validateTableQuerySelector } from './validators';
import DataTable from 'datatables.net-dt';
import { type Api } from 'datatables.net-dt';
import type { JSON } from '../types';

/** Represents the Editables instance. */
export default class Editables<T extends JSON> {
    public readonly dataTable: Api<T>;

    public constructor(readonly tableQuerySelector: string) {
        // WARNING: Throws an error if the `tableQuerySelector` is not valid.
        validateTableQuerySelector(tableQuerySelector);

        this.dataTable = new DataTable<T>(tableQuerySelector);
    }
}
