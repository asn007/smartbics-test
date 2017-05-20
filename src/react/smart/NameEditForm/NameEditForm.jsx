import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../dumb/Button/Button';
import InputField from '../../dumb/InputField';
import InputGroup from '../../dumb/InputGroup';

export default class NameEditForm extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onRevert: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: ''
  };

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  handleSave = evt => {
    evt.stopPropagation();
    evt.preventDefault();
    this.props.onSave(this.state.value);
  };

  handleRevert = evt => {
    evt.stopPropagation();
    evt.preventDefault();
    this.props.onRevert();
  };

  componentWillReceiveProps({ value }) {
    if (value !== this.state.value) this.setState({ value });
  }

  updateValueInState = ({ target: { value } }) => this.setState({ value });

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <InputGroup>
          <InputField
            type="text"
            onChange={this.updateValueInState}
            value={this.state.value}
          />
          <Button type="submit">Save</Button>
          <Button onClick={this.handleRevert} danger>Cancel</Button>
        </InputGroup>
      </form>
    );
  }
}
