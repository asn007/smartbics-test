import React from 'react';

export default class TreeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tree: { childNodes: [] } };
  }

  updateTree = newTree => {
    this.setState({ tree: newTree });
    //this.forceUpdate();
  };

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            updateTree: this.updateTree,
            tree: this.state.tree
          })
        )}
      </div>
    );
  }
}
