import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import HomeComponent from '../home/home.component';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a comment box', () => {
  expect(wrapped.find(HomeComponent).length).toEqual(1);
});
