import React from 'react';
import PropTypes from 'prop-types';
import s from './Row.scss';
import _ from 'lodash';
import Cell from '../Cell';
import mobxReact from 'mobx-react';

import {excelStore} from '../../store/store';
const {observer} = mobxReact;


const Row = observer(function ({rowIndex}) {

  return (
    <tr className={s.tableRow}>
      <th>{rowIndex + 1}</th>
      { _.times(10, cellIndex => <Cell key={cellIndex} rowIndex={rowIndex} cellIndex={cellIndex} />) }
    </tr>
  );
});

Row.propTypes = {
  rowIndex: PropTypes.number.isRequired
};

export default Row;
