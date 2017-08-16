import React from 'react';
import PropTypes from 'prop-types';
import s from './FormulaEditor.scss';
import mobxReact from 'mobx-react';

import {excelStore} from '../../store/store';
const {observer} = mobxReact;

class InputWithState extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      value: props.value
    };
  }

  shouldComponentUpdate() {
    console.log('should update');
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }

    console.log('component wil receive props');
    this.cellInput.focus();
  }

  componentDidMount() {
    this.cellInput.focus();
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onChange(this.state.value);
    }
  }

  onChange(e) {
    excelStore.updateCellOfSelected(e.target.value);
    this.setState({value: e.target.value});
  }

  focus() {
    this.cellInput.focus();
  }

  render() {

    return (
      <input type="text"
             className={s.formulaInput}
             onChange={this.onChange}
             onKeyPress={this.onKeyPress}
             value={this.state.value}
             ref={(input) => {
               this.cellInput = input;
             }}
      />
    )
  }
}

InputWithState.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const FormulaEditor = observer(() => (
  <div className={s.formulaEditor}>
    Formula: <InputWithState value={excelStore.getSelectedValue()} onChange={() => {
  }}/>
  </div>

));

export default FormulaEditor;
