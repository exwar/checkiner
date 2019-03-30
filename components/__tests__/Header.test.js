/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Header from 'components/Header';

describe('With Enzyme', () => {
  const children = <p>Hello World!</p>;
  it('Header renders log out button', () => {
    const header = shallow(<Header />);

    expect(header.find('.header__logout span').text()).toEqual('Log out');
  });

  it('Header renders user card with passed avatar url and username', () => {
    const avatar = '/avatars/user.png';
    const username = 'userName';
    const header = shallow(<Header username={username} avatar={avatar} />);

    expect(header.find('.user__avatar').prop('src')).toEqual(avatar);
    expect(header.find('.user__name').text()).toEqual(username);
  });
});

describe('With Snapshot testing', () => {
  it('Header rendered correctly', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
