import React from 'react';
import InputGroup from '../InputGroup';
import theme from '../InputGroup.css';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import InputField from '../../InputField';
import Button from '../../Button';

describe('InputField', () => {
  test('it should render its markup correctly', () => {
    const component = (
      <InputGroup className="test">
        <InputField value="test" />
        <Button>Test</Button>
      </InputGroup>
    );
    const shallowRendered = shallow(component);
    const reactRendered = renderer.create(component);
    expect(reactRendered.toJSON()).toMatchSnapshot();
    expect(shallowRendered.children().length).toBe(2);
    expect(shallowRendered.hasClass(theme.inputGroup)).toBe(true);
    expect(shallowRendered.hasClass('test')).toBe(true);
  });
});
