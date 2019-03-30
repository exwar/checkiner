/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from 'components/Button';

describe('With Enzyme', () => {
  const children = <p>Hello World!</p>;
  it('Button renders passed children', () => {
    const button = shallow(<Button>{children}</Button>);

    expect(button.find('p').text()).toEqual('Hello World!');
  });
});

describe('With Snapshot testing', () => {
  it('Button rendered correctly', () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
