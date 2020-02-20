import React from 'react';
import { shallow } from 'enzyme';

import { CardList } from '../card-list/card-list.component';
import { Card } from '../card/card.component';

const STUB_DATA = require('./stubdata.json');
let wrapper;

beforeEach(() => {
  wrapper = shallow(<CardList legends={STUB_DATA.cards} />);
});

it('renders CardList without crashing', () => {
  expect(wrapper).toBeDefined();
});

it('has displayed all Card components', () => {
  expect(wrapper.find(Card).length).toEqual(5);
});
