import mobx from 'mobx';

const { observable, action } = mobx;

export const excelStore = {
  dataCells: observable({
    '1_1': '5',
    '2_3': '9+5'
  }),
  selected: observable('4_5'),

  getCellValueEval: (rowIndex, cellIndex) => {
    const cellId = `${rowIndex}_${cellIndex}`;
    return eval(excelStore.dataCells[cellId]);
  },
  updateSelected: action(function (newId) {
    excelStore.selected.set(newId);
  }),
  eventOnClick: function (event) {
    const cellId = event.target.dataset.cellid;
    excelStore.updateSelected(cellId);
  }
}
