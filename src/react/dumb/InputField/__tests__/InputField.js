import React from 'react';
import InputField from '../InputField';
import theme from '../InputField.css';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('InputField', () => {
  test('it should render its markup correctly', () => {
    const component = <InputField className="test" value="text" />;
    const shallowRendered = shallow(component);
    const reactRendered = renderer.create(component);
    expect(reactRendered.toJSON()).toMatchSnapshot();
    expect(shallowRendered.hasClass(theme.input)).toBe(true);
    expect(shallowRendered.hasClass('test')).toBe(true);
  });
});
