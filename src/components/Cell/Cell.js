import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import mobxReact from 'mobx-react';

import {excelStore} from '../../store/store';

const {getCellValueEval, eventOnClick} = excelStore;
const {observer} = mobxReact;


const Cell = observer(function ({rowIndex, cellIndex, selected}) {

  const className = (`${s.cell} ${selected ? s.selected : ''}`).trim();

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
