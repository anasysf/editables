import { Editable } from './dist/editables.js';

const container = document.getElementById('container');

const editable = new Editable(container, { tableId: 'a' });

const cols = [
  {
    name: 'id',
    key: 'sex',
  },
  {
    name: 'name',
  },
];

const moreCols = [
  {
    name: 'id',
    key: 'hoooo',
  },
  {
    name: 'heeeee',
  },
];

const rows = [
  [1, 'xridr'],
  [2, 'xibekoook', 'aaaaaaa'],
  [2, 'xibekoook', 'aaaaaaa', 'bbbb'],
];

editable.setColumns(cols).setRows(rows).addColumns(moreCols);

console.debug(editable.columns);
