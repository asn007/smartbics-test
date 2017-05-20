import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from '../TreeNode';
import Button from '../../dumb/Button/Button';
import style from './App.css';
import treeStructure from '../../../helpers/demoTree';
import {
  updateByPath,
  createByPath,
  deleteByPath
} from '../../../helpers/immutabilityHelper';

const mapPointer = string => {
  const temp = string
    .split('.')
    .filter(t => t)
    .map(value => parseInt(value, 10));
  temp.shift();

  return temp;
};

export default class ProductionApp extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tree: PropTypes.object.isRequired,
    updateTree: PropTypes.func.isRequired
  };

  static defaultProps = {
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      canLoad: !!localStorage.getItem('sbicsTree')
    };
  }

  loadTree = () => {
    this.props.updateTree(JSON.parse(localStorage.getItem('sbicsTree')));
  };

  saveTree = () => {
    localStorage.setItem('sbicsTree', JSON.stringify(this.props.tree));
    this.setState({ canLoad: true });
  };

  loadDefaultTree = () => {
    this.props.updateTree(treeStructure);
  };

  updateNode = (pointer, nodeData) => {
    this.props.updateTree(
      updateByPath(this.props.tree, mapPointer(pointer), nodeData)
    );
  };

  createNode = (pointer, value) => {
    this.props.updateTree(
      createByPath(this.props.tree, mapPointer(pointer), value)
    );
  };

  deleteNode = pointer => {
    this.props.updateTree(deleteByPath(this.props.tree, mapPointer(pointer)));
  };

  render() {
    return (
      <div>
        <h5>Tree Renderer</h5>
        <TreeNode
          pointer=".0"
          updateNode={this.updateNode}
          createNode={this.createNode}
          deleteNode={this.deleteNode}
          {...this.props.tree}
        />
        <div className={style.buttonRow}>
          {this.state.canLoad
            ? <Button onClick={this.loadTree}>
                Load tree from localStorage
              </Button>
            : <Button onClick={this.loadDefaultTree}>Load default tree</Button>}
          <Button onClick={this.saveTree} success>
            Save tree to localStorage
          </Button>
        </div>
        {this.props.children}
      </div>
    );
  }
}
