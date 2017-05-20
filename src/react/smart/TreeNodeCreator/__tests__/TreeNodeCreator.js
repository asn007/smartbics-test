import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import style from '../TreeNodeCreator.css';
import TreeNodeCreator from '../TreeNodeCreator';


describe('TreeNodeCreator', () => {
  test('it should render its markup correctly', () => {
    let newText = ''
    const changeHandler = (value) => newText = value;
    const content = <TreeNodeCreator />
    const shallowRendered = shallow(content);
    expect(shallowRendered.childAt(0).hasClass(style.arrow)).toBe(true);
    expect(shallowRendered.childAt(0).text()).toBe('→');
    shallowRendered.childAt(0).simulate('click');
    expect(shallowRendered.childAt(0).getNode().type.name).toEqual('NameEditForm');
  });
})
