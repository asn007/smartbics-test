import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import NameEditForm from '../NameEditForm';



describe('NameEditForm', () => {
  test('it should render its markup correctly', () => {
    let newText = ''
    const changeHandler = (value) => newText = value;
    const revertHandler = () => newText = 'Revert'
    const content = <NameEditForm onSave={changeHandler} onRevert={revertHandler} value="test" />
    const shallowRendered = shallow(content);
    expect(shallowRendered.childAt(0).getNode().type.name).toEqual('InputGroup');
    shallowRendered.instance().setState({ value: 'new' });
    shallowRendered.instance().handleSave({ stopPropagation: () => {}, preventDefault: () => {} });
    expect(newText).toEqual('new');
    shallowRendered.instance().handleRevert({ stopPropagation: () => {}, preventDefault: () => {} })
    expect(newText).toEqual('Revert');
  });
})
