import React from 'react';
import PropTypes from 'prop-types';
import NameEditForm from '../NameEditForm/NameEditForm';
import style from './EditableContent.css';

export default class EditableContent extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditing: false
    };
  }

  componentWillReceiveProps({ value }) {
    if (this.state.value !== value) {
      this.setState({ value });
    }
  }

  updateValueInState = value => {
    this.setState({ value, isEditing: false });
    if (this.props.value !== value) {
      this.props.onChange(value);
    }
  };

  toggleEditing = () => this.setState({ isEditing: true });

  revertChanges = () => this.setState({ value: this.props.value });

  render() {
    return (
      <div className={style.editableContent}>
        {this.state.isEditing
          ? <NameEditForm
              onSave={this.updateValueInState}
              onRevert={this.revertChanges}
              value={this.state.value}
            />
          : <span onClick={this.toggleEditing}>{this.state.value}</span>}
      </div>
    );
  }
}
