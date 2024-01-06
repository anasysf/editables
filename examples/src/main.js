import { Editables, Field } from '../../dist/module/index.js';

const fields = [new Field({ name: 'title' }), new Field({ name: 'description' })];
const editables = new Editables('my-table', {
  dataSrc: {
    source: 'https://dummyjson.com/products',
    prop: 'products',
  },
  fields,
  rowId: 'id',
});

editables.on('data-loaded', (data) => console.info(data, fields));
