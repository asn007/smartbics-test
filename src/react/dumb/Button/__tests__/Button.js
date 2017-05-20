import React from 'react';
import Button from '../Button';
import theme from '../Button.css';
import { shallow } from 'enzyme';

describe('Button', () => {
  test('it should render its markup correctly', () => {
    const button = shallow(<Button>Test</Button>);
    expect(button.childAt(0).text()).toEqual('Test');
  });

  test('it should add danger class when danger prop is present', () => {
    const button = shallow(<Button danger>Test</Button>);
    expect(button.hasClass(theme.danger)).toEqual(true);
  });

  test('it should add success class when success prop is present', () => {
    const button = shallow(<Button success>Test</Button>);
    expect(button.hasClass(theme.success)).toEqual(true);
  });

  test('it should accept custom classname', () => {
    const button = shallow(<Button className="test">Test</Button>);
    expect(button.hasClass("test")).toEqual(true);
  });
});
