import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import style from '../TreeNodeCreator.css';
import TreeProvider from '../TreeProvider';

describe('TreeProvider', () => {
  test('it should provide its tree to children', () => {
    let hasNodes = false;
    const Demo = ({ tree }) => {
      hasNodes = !!tree.childNodes;
      return <div />;
    }
    const mounted = mount(<TreeProvider><Demo /></TreeProvider>);
    expect(hasNodes).toBe(true);
  })

  test('it should provide a method for updating provided tree', () => {
    let hasNode = true;
    const Demo = ({ tree }) => {
      hasNode = tree.childNodes[0].value === 'test';
      return <div />;
    }
    const shallowRendered = shallow(<TreeProvider><Demo /></TreeProvider>);
    shallowRendered.instance().updateTree({ childNodes: [ { value: 'test' }]});
    expect(hasNode).toBe(true);
  })
})
