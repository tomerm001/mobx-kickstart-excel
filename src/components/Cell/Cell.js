import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import mobxReact from 'mobx-react';
import * as mobx from 'mobx';

import {excelStore} from '../../store/store';

const {getCellValueEval, eventOnClick} = excelStore;
const {observer} = mobxReact;
const {computed, observable} = mobx;

const createCellStore = key => {
  const id = observable(key);
  return {
    id,
    isSelected: computed(() => {
      return id.get() === excelStore.selected.get();
    })
  };
};

const Cell = observer(class Cell extends React.Component {
  constructor({rowIndex, cellIndex}) {
    super();
    this.cellStore = createCellStore(`${rowIndex}_${cellIndex}`);
  }

  render() {
    const myClassName = this.cellStore.isSelected.get() ? `${s.cell} ${s.selected}` : s.cell;

    return (
      <td data-cellId={`${this.props.rowIndex}_${this.props.cellIndex}`}
          onClick={eventOnClick}
          className={myClassName}>{getCellValueEval(this.props.rowIndex, this.props.cellIndex)}</td>
    );
  }
});

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;
