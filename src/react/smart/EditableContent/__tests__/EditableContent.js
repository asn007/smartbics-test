import React from 'react';
import { shallow } from 'enzyme';
import EditableContent from '../EditableContent';
import style from '../EditableContent.css';

describe('EditableContent', () => {
  test('it should render its markup correctly', () => {
    let newText = '';
    const changeHandler = (value) => { newText = value; };
    const content = <EditableContent value="test" onChange={changeHandler} />;
    const shallowRendered = shallow(content);
    expect(shallowRendered.hasClass(style.editableContent)).toBe(true);
    expect(shallowRendered.childAt(0).text()).toBe('test');
    shallowRendered.childAt(0).simulate('click');
    expect(shallowRendered.childAt(0).getNode().type.name).toEqual('NameEditForm');
    shallowRendered.instance().updateValueInState('New')
    expect(newText).toEqual('New');
  });
})
