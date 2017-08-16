import * as mobx from 'mobx';

const {observable, action} = mobx;


export const excelStore = {
  dataCells: observable.map({
    '1_1': '5',
    '2_3': '9+5'
  }),

  selected: observable('0_0'),


  getCellValueEval: (rowIndex, cellIndex) => {
    const cellId = `${rowIndex}_${cellIndex}`;
    return eval(excelStore.dataCells.get(cellId));
  },

  getSelectedValue: () => {
    const selectedCell = excelStore.selected.get();
    if (excelStore.dataCells.get(selectedCell) === undefined) {
      return '';
    } else {
      return excelStore.dataCells.get(selectedCell);
    }
  },

  setCellValue: (cellId, value) => {
    excelStore.dataCells.set(cellId.get(), value);
  },

  updateSelected: action(function (newId) {
    excelStore.selected.set(newId);
  }),

  eventOnClick: action(function (event) {
    const cellId = event.target.dataset.cellid;
    excelStore.updateSelected(cellId);
  }),

  updateCellOfSelected: action(function (value) {
    excelStore.setCellValue(excelStore.selected, value);
  }),

};

