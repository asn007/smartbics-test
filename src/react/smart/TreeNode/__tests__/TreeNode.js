import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import TreeNode from '../TreeNode';
import tree from '../../../../helpers/demoTree';



describe('TreeNode', () => {
  test('it should render its markup correctly', () => {
    const component = renderer.create(<TreeNode {...tree} pointer=".0" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
})
