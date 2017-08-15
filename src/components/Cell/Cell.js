import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import mobxReact from 'mobx-react';
import mobx from 'mobx';

import {excelStore} from '../../store/store';

const {getCellValueEval, eventOnClick} = excelStore;
const {observer} = mobxReact;
const { computed, observable } = mobx;


const Cell = observer(function ({rowIndex, cellIndex}) {

  const checkIfSelected = (() => {
    return `${rowIndex}_${cellIndex}` === excelStore.selected.get();
  });

  const className = (`${s.cell} ${checkIfSelected() ? s.selected : ''}`).trim();

  console.log('re-render', `${rowIndex}_${cellIndex}` );

  return (
    <td data-cellId={`${rowIndex}_${cellIndex}`}
        onClick={eventOnClick}
        className={className}>{getCellValueEval(rowIndex, cellIndex)}</td>
  );
});

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;
