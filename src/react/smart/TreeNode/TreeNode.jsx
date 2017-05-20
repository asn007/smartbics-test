import React from 'react';
import PropTypes from 'prop-types';
import EditableContent from '../EditableContent/EditableContent';
import Button from '../../dumb/Button/Button';
import TreeNodeCreator from '../TreeNodeCreator/TreeNodeCreator';
import style from './TreeNode.css';

export default class TreeNode extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    childNodes: PropTypes.array
  };

  static defaultProps = {
    value: null,
    childNodes: []
  };

  updateGlobalTree = value => {
    this.props.updateNode(this.props.pointer.toString(), {
      value,
      childNodes: this.props.childNodes
    });
  };

  createNode = value => {
    if (!!value)
      this.props.createNode(this.props.pointer.toString(), {
        value,
        childNodes: []
      });
  };

  deleteNode = () => this.props.deleteNode(this.props.pointer.toString());

  renderChildren(isMasterNode = true) {
    const { pointer, childNodes } = this.props;
    return childNodes.map((props, index) => {
      const childPointer = pointer.toString() + '.' + index.toString();
      return React.createElement(TreeNode, {
        ...props,
        key: childPointer,
        pointer: childPointer,
        updateNode: this.props.updateNode,
        createNode: this.props.createNode,
        deleteNode: this.props.deleteNode
      });
    });
  }

  renderRoot() {
    const { childNodes } = this.props;
    return (
      <ul className={style.tree}>
        {this.renderChildren(true)}
        <TreeNodeCreator createNode={this.createNode} />
      </ul>
    );
  }

  render() {
    const { value, childNodes, pointer } = this.props;
    if (pointer.length === 2) return this.renderRoot();
    else
      return (
        <li>
          {value
            ? <span>
                <EditableContent
                  onChange={this.updateGlobalTree}
                  value={value}
                />
                <Button onClick={this.deleteNode} danger>×</Button>
              </span>
            : null}
          {
            <ul>
              {this.renderChildren()}
              <TreeNodeCreator createNode={this.createNode} />
            </ul>
          }
        </li>
      );
  }
}
