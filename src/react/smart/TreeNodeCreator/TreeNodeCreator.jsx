import React from 'react';
import style from './TreeNodeCreator.css';
import NameEditForm from '../NameEditForm/NameEditForm';

export default class TreeNodeCreator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleCreate = () => this.setState({ isExpanded: !this.state.isExpanded });

  handleCreate = value => {
    this.toggleCreate();
    this.props.createNode(value);
  };

  render() {
    return (
      <li className={style.treeNodeCreator}>
        {this.state.isExpanded
          ? <NameEditForm
              onSave={this.handleCreate}
              onRevert={this.toggleCreate}
              value=""
            />
          : <div onClick={this.toggleCreate} className={style.arrow}>→</div>}
      </li>
    );
  }
}
